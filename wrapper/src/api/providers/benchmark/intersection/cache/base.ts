import LRUCache from 'lru-cache';

import { tables } from '../../../../database';
import {
  DatasetId,
  ExperimentConfigItem,
  ExperimentId,
  SimilarityThresholdFunctionId,
} from '../../../../server/types';

export type IntersectionBaseConfig = {
  group1: ExperimentConfigItem[];
  group2: ExperimentConfigItem[];
  datasetId: DatasetId;
};

export interface IntersectionCacheContent<Config> {
  readonly config: Config;
  readonly size: number;
}

/**
 * the maximum storage correlates to this number
 */
const MAX_STORAGE = 1_000_000_000;

export abstract class IntersectionCacheBase<
  Config,
  Content extends IntersectionCacheContent<Config>
> {
  get(config: Config): Content {
    const baseConfig = this.sortConfig(
      this.mapCustomConfigToBaseConfig(config)
    );
    const key = this.keyOfBaseConfig(baseConfig);
    let intersection = this.cache.get(key);
    if (!intersection) {
      intersection = this.create(
        this.mapBaseConfigToCustomConfig(baseConfig),
        key
      );
      this.prepareInvalidation(key, baseConfig);
      this.cache.set(key, intersection);
    }
    return intersection;
  }

  keyOf(config: Config): string {
    const baseConfig = this.mapCustomConfigToBaseConfig(config);
    return this.keyOfBaseConfig(baseConfig);
  }

  static stringifyExperiment(experiment: ExperimentId): string {
    return `e${experiment}E`;
  }

  static stringifySimilarityFunction(
    func: SimilarityThresholdFunctionId
  ): string {
    return `s${func}S`;
  }

  static stringifyDataset(dataset: ExperimentId): string {
    return `d${dataset}D`;
  }

  static invalidateExperiment(experiment: ExperimentId): void {
    this.invalidate((instance) => instance.invalidateExperiment(experiment));
  }

  static invalidateDataset(dataset: DatasetId): void {
    this.invalidate((instance) => instance.invalidateDataset(dataset));
  }

  static invalidateSimilarityFunction(
    func: SimilarityThresholdFunctionId
  ): void {
    this.invalidate((instance) => instance.invalidateSimilarityFunction(func));
  }

  protected static instances: WeakRef<
    IntersectionCacheBase<unknown, IntersectionCacheContent<unknown>>
  >[] = [];

  protected static invalidatePersistentCaches(identifier: string): void {
    tables.cache.intersectionCounts.delete(
      {
        key: `%${identifier}%`,
      },
      'LIKE'
    );
  }

  protected static invalidate(
    run: (
      instance: IntersectionCacheBase<
        unknown,
        IntersectionCacheContent<unknown>
      >
    ) => void
  ): void {
    this.instances = this.instances.filter((instance) => instance.deref());
    for (const instance of this.instances.map(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (instance) => instance.deref()!
    )) {
      run(instance);
    }
  }

  abstract mapCustomConfigToBaseConfig(config: Config): IntersectionBaseConfig;
  abstract mapBaseConfigToCustomConfig(config: IntersectionBaseConfig): Config;
  abstract create(config: Config, key: string): Content;

  constructor() {
    IntersectionCacheBase.instances.push(new WeakRef(this));
  }

  protected invalidateDataset(id: DatasetId): void {
    this.invalidateKeys(this.datasetKeys, id);
  }

  protected invalidateExperiment(id: ExperimentId): void {
    this.invalidateKeys(this.experimentKeys, id);
  }

  protected invalidateSimilarityFunction(
    id: SimilarityThresholdFunctionId
  ): void {
    this.invalidateKeys(this.similarityFunctionKeys, id);
  }

  protected datasetKeys = new Map<DatasetId, Set<string>>();
  protected similarityFunctionKeys = new Map<
    SimilarityThresholdFunctionId,
    Set<string>
  >();
  protected experimentKeys = new Map<ExperimentId, Set<string>>();

  protected cache = new LRUCache<string, Content>({
    length: (intersection) => intersection.size,
    dispose: (key, { config }) => {
      const { datasetId, group1, group2 } = this.mapCustomConfigToBaseConfig(
        config
      );
      this.datasetKeys.get(datasetId)?.delete(key);
      this.deleteExperimentConfigItemsKey(group1, key);
      this.deleteExperimentConfigItemsKey(group2, key);
    },
    noDisposeOnSet: true,
    max: MAX_STORAGE,
  });

  protected keyOfBaseConfig(config: IntersectionBaseConfig): string {
    return `${IntersectionCacheBase.stringifyDataset(
      config.datasetId
    )}-${this.stringifyExperimentConfigItems(
      config.group1
    )}-${this.stringifyExperimentConfigItems(config.group2)}`;
  }

  protected deleteExperimentConfigItemsKey(
    items: ExperimentConfigItem[],
    key: string
  ): void {
    for (const { experimentId, similarity } of items) {
      this.experimentKeys.get(experimentId)?.delete(key);
      if (similarity) {
        this.similarityFunctionKeys.get(similarity.func)?.delete(key);
      }
    }
  }

  protected invalidateKeys(keys: Map<number, Set<string>>, id: number): void {
    [...this.getInvalidationKeys(keys, id).values()].map((key) =>
      this.cache.del(key)
    );
    keys.delete(id);
  }

  protected stringifyExperimentConfigItems(
    items: ExperimentConfigItem[]
  ): string {
    return items
      .map(
        ({ experimentId, similarity }) =>
          `${IntersectionCacheBase.stringifyExperiment(experimentId)}${
            similarity
              ? `:${IntersectionCacheBase.stringifySimilarityFunction(
                  similarity.func
                )}=${similarity.threshold}`
              : ''
          }`
      )
      .join('&');
  }

  protected getInvalidationKeys(
    keys: Map<number, Set<string>>,
    id: number
  ): Set<string> {
    let keySet = keys.get(id);
    if (!keySet) {
      keySet = new Set();
      keys.set(id, keySet);
    }
    return keySet;
  }

  protected prepareExperimentAndSimilarityInvalidation(
    key: string,
    items: ExperimentConfigItem[]
  ): void {
    for (const { experimentId, similarity } of items) {
      this.getInvalidationKeys(this.experimentKeys, experimentId).add(key);
      if (similarity) {
        this.getInvalidationKeys(
          this.similarityFunctionKeys,
          similarity.func
        ).add(key);
      }
    }
  }

  protected prepareInvalidation(
    key: string,
    { datasetId, group2: negative, group1: positive }: IntersectionBaseConfig
  ): void {
    this.getInvalidationKeys(this.datasetKeys, datasetId).add(key);
    this.prepareExperimentAndSimilarityInvalidation(key, positive);
    this.prepareExperimentAndSimilarityInvalidation(key, negative);
  }

  protected sortExperimentConfigItems(
    items: ExperimentConfigItem[]
  ): ExperimentConfigItem[] {
    return items.slice().sort((a, b) => a.experimentId - b.experimentId);
  }

  protected sortConfig({
    group1: positive,
    group2: negative,
    ...rest
  }: IntersectionBaseConfig): IntersectionBaseConfig {
    return {
      group1: this.sortExperimentConfigItems(positive),
      group2: this.sortExperimentConfigItems(negative),
      ...rest,
    };
  }
}

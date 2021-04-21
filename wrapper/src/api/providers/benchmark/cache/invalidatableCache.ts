import {
  DatasetId,
  ExperimentConfigItem,
  ExperimentId,
  SimilarityThresholdFunctionId,
} from '../../../server/types';
import { BasicBenchmarkCache } from './basicCache';
import { BenchmarkCacheBaseConfig, BenchmarkCacheContent } from './types';

export abstract class InvalidatableBenchmarkCache<
  Config,
  Content extends BenchmarkCacheContent<Config>
> extends BasicBenchmarkCache<Config, Content> {
  static invalidateExperiment(experiment: ExperimentId): void {
    this.invalidate((instance) =>
      instance.invalidateKeys(instance.experimentKeys, experiment)
    );
  }

  static invalidateDataset(dataset: DatasetId): void {
    this.invalidate((instance) =>
      instance.invalidateKeys(instance.datasetKeys, dataset)
    );
  }

  static invalidateSimilarityFunction(
    func: SimilarityThresholdFunctionId
  ): void {
    this.invalidate((instance) =>
      instance.invalidateKeys(instance.similarityFunctionKeys, func)
    );
  }

  static clear(): void {
    this.invalidate((instance) => instance.clear());
  }

  protected static instances: WeakRef<
    InvalidatableBenchmarkCache<unknown, BenchmarkCacheContent<unknown>>
  >[] = [];

  protected static invalidate(
    run: (
      instance: InvalidatableBenchmarkCache<
        unknown,
        BenchmarkCacheContent<unknown>
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

  protected datasetKeys = new Map<DatasetId, Set<string>>();
  protected similarityFunctionKeys = new Map<
    SimilarityThresholdFunctionId,
    Set<string>
  >();
  protected experimentKeys = new Map<ExperimentId, Set<string>>();

  constructor() {
    super();
    InvalidatableBenchmarkCache.instances.push(new WeakRef(this));
  }

  protected invalidateKeys(keys: Map<number, Set<string>>, id: number): void {
    [...this.getInvalidationKeys(keys, id).values()].map((key) =>
      this.cache.del(key)
    );
    keys.delete(id);
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

  protected createAndCache(
    config: BenchmarkCacheBaseConfig,
    key: string
  ): Content {
    this.prepareInvalidation(key, config);
    return super.createAndCache(config, key);
  }

  protected prepareInvalidation(
    key: string,
    { datasetId, group2, group1 }: BenchmarkCacheBaseConfig
  ): void {
    this.getInvalidationKeys(this.datasetKeys, datasetId).add(key);
    this.prepareExperimentAndSimilarityInvalidation(key, group1);
    this.prepareExperimentAndSimilarityInvalidation(key, group2);
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

  protected dispose(key: string, content: Content): void {
    const { datasetId, group1, group2 } = this.mapCustomConfigToBaseConfig(
      content.config
    );
    this.datasetKeys.get(datasetId)?.delete(key);
    this.deleteExperimentConfigItemsKey(group1, key);
    this.deleteExperimentConfigItemsKey(group2, key);
    super.dispose(key, content);
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

  clear(): void {
    this.cache.reset();
    this.datasetKeys.clear();
    this.experimentKeys.clear();
    this.similarityFunctionKeys.clear();
  }
}

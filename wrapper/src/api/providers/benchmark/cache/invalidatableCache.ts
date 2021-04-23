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
  clear(): void {
    this.cache.reset();
    this.datasetKeys.clear();
    this.experimentKeys.clear();
    this.similarityFunctionKeys.clear();
  }

  /**
   * when a cache object is no longer needed, the cleanup method should be called
   */
  cleanup(): void {
    InvalidatableBenchmarkCache.instances = InvalidatableBenchmarkCache.instances.filter(
      (instance) => instance !== this
    );
  }

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

  protected static instances: InvalidatableBenchmarkCache<
    unknown,
    BenchmarkCacheContent<unknown>
  >[] = [];

  protected static invalidate(
    run: (
      instance: InvalidatableBenchmarkCache<
        unknown,
        BenchmarkCacheContent<unknown>
      >
    ) => void
  ): void {
    for (const instance of this.instances) {
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
    InvalidatableBenchmarkCache.instances.push(this);
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
}

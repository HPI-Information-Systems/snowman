import { DatasetId, ExperimentConfigItem } from '../../../../server/types';
import { CacheableModularSubclusting } from '../../cachableSubclustering/cachableModularSubclustering';
import { CacheableSubclusting } from '../../cachableSubclustering/cacheableSubclustering';
import { CacheableSubclustingBase } from '../../cachableSubclustering/cacheableSubclusteringBase';
import { BenchmarkCache } from '../cache';
import { BenchmarkCacheBaseConfig } from '../types';

export type SubclusteringConfig = {
  base: ExperimentConfigItem[];
  partition: ExperimentConfigItem[];
  datasetId: DatasetId;
};

class SubclusterCacheClass extends BenchmarkCache<
  SubclusteringConfig,
  CacheableSubclustingBase
> {
  protected readonly keyPrefix = 'subclustering';

  protected mapCustomConfigToBaseConfig({
    datasetId,
    base,
    partition,
  }: SubclusteringConfig): BenchmarkCacheBaseConfig {
    return {
      datasetId,
      group1: base,
      group2: partition,
    };
  }
  protected mapBaseConfigToCustomConfig({
    datasetId,
    group2,
    group1,
  }: BenchmarkCacheBaseConfig): SubclusteringConfig {
    return {
      datasetId,
      base: group1,
      partition: group2,
    };
  }

  protected create(
    config: SubclusteringConfig,
    key: string
  ): CacheableSubclustingBase {
    if (config.base.length === 1 && config.base[0].similarity) {
      return new CacheableModularSubclusting(config, key);
    } else {
      return new CacheableSubclusting(config, key);
    }
  }

  protected stringifyExperimentConfigItem(
    item: ExperimentConfigItem,
    config: BenchmarkCacheBaseConfig
  ): string {
    const { base } = this.mapBaseConfigToCustomConfig(config);
    if (base.length === 1 && base[0].similarity && item === base[0]) {
      const { experimentId, similarity } = item;
      return `${this.stringifyExperiment(experimentId)}${
        similarity
          ? `:${this.stringifySimilarityFunction(similarity.func)}`
          : ''
      }`;
    } else {
      return super.stringifyExperimentConfigItem(item, config);
    }
  }
}

export const SubclusterCache = new SubclusterCacheClass();

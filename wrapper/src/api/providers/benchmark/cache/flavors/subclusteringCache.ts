import { DatasetId, ExperimentConfigItem } from '../../../../server/types';
import { CacheableSubclusting } from '../../cachableSubclustering/cacheableSubclustering';
import { BenchmarkCache } from '../cache';
import { BenchmarkCacheBaseConfig } from '../types';

export type SubclusteringConfig = {
  base: ExperimentConfigItem[];
  partition: ExperimentConfigItem[];
  datasetId: DatasetId;
};

class SubclusterCacheClass extends BenchmarkCache<
  SubclusteringConfig,
  CacheableSubclusting
> {
  protected readonly keyPrefix = 'subclustering';

  protected mapCustomConfigToBaseConfig(
    config: SubclusteringConfig
  ): BenchmarkCacheBaseConfig<SubclusteringConfig> {
    return {
      datasetId: config.datasetId,
      group1: config.base,
      group2: config.partition,
      config,
    };
  }

  protected create(
    config: SubclusteringConfig,
    key: string
  ): CacheableSubclusting {
    return new CacheableSubclusting(config, key);
  }
}

export const SubclusterCache = new SubclusterCacheClass();

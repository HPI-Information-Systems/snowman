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
    group1,
    group2,
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
  ): CacheableSubclusting {
    return new CacheableSubclusting(config, key);
  }

  protected readonly keyPrefix = 'subclustering';
}

export const SubclusterCache = new SubclusterCacheClass();

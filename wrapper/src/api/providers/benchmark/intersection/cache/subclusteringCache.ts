import { DatasetId, ExperimentConfigItem } from '../../../../server/types';
import { CachedSubclusting } from '../cachedSubclustering';
import { IntersectionBaseConfig, IntersectionCacheBase } from './base';

export type SubclusteringConfig = {
  base: ExperimentConfigItem[];
  partition: ExperimentConfigItem[];
  datasetId: DatasetId;
};

class SubclusterCacheClass extends IntersectionCacheBase<
  SubclusteringConfig,
  CachedSubclusting
> {
  mapCustomConfigToBaseConfig({
    datasetId,
    base,
    partition,
  }: SubclusteringConfig): IntersectionBaseConfig {
    return {
      datasetId,
      group1: base,
      group2: partition,
    };
  }
  mapBaseConfigToCustomConfig({
    datasetId,
    group1,
    group2,
  }: IntersectionBaseConfig): SubclusteringConfig {
    return {
      datasetId,
      base: group1,
      partition: group2,
    };
  }
  create(config: SubclusteringConfig, key: string): CachedSubclusting {
    return new CachedSubclusting(config, key);
  }
}

export const SubclusterCache = new SubclusterCacheClass();

import { DatasetId, ExperimentConfigItem } from '../../../server/types';
import { BenchmarkCache } from '../cache/cache';
import { BenchmarkCacheBaseConfig } from '../cache/types';
import { Intersection } from '.';

export type IntersectionConfig = {
  included: ExperimentConfigItem[];
  excluded: ExperimentConfigItem[];
  datasetId: DatasetId;
};

class IntersectionCacheClass extends BenchmarkCache<
  IntersectionConfig,
  Intersection
> {
  protected mapCustomConfigToBaseConfig({
    datasetId,
    included,
    excluded,
  }: IntersectionConfig): BenchmarkCacheBaseConfig {
    return {
      datasetId,
      group1: included,
      group2: excluded,
    };
  }

  protected mapBaseConfigToCustomConfig({
    datasetId,
    group1,
    group2,
  }: BenchmarkCacheBaseConfig): IntersectionConfig {
    return {
      datasetId,
      included: group1,
      excluded: group2,
    };
  }

  protected create(config: IntersectionConfig, key: string): Intersection {
    return new Intersection(config, key);
  }

  readonly keyPrefix = 'intersection';
}

export const IntersectionCache = new IntersectionCacheClass();

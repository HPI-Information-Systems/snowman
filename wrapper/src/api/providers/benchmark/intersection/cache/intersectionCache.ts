import { DatasetId, ExperimentConfigItem } from '../../../../server/types';
import { Intersection } from '..';
import { IntersectionBaseConfig, IntersectionCacheBase } from './base';

export type IntersectionConfig = {
  included: ExperimentConfigItem[];
  excluded: ExperimentConfigItem[];
  datasetId: DatasetId;
};

class IntersectionCacheClass extends IntersectionCacheBase<
  IntersectionConfig,
  Intersection
> {
  mapCustomConfigToBaseConfig({
    datasetId,
    included,
    excluded,
  }: IntersectionConfig): IntersectionBaseConfig {
    return {
      datasetId,
      group1: included,
      group2: excluded,
    };
  }

  mapBaseConfigToCustomConfig({
    datasetId,
    group1,
    group2,
  }: IntersectionBaseConfig): IntersectionConfig {
    return {
      datasetId,
      included: group1,
      excluded: group2,
    };
  }

  create(config: IntersectionConfig, key: string): Intersection {
    return new Intersection(config, key);
  }
}

export const IntersectionCache = new IntersectionCacheClass();

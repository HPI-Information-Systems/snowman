import { DatasetId, ExperimentConfigItem } from '../../../../server/types';
import { IntersectionBase } from '../../intersection/intersectionBase';
import { IntersectionWithExcludes } from '../../intersection/intersectionWithExcludes';
import { ModularIntersectionOneInclude } from '../../intersection/modularIntersectionOneInclude';
import { ModularIntersectionOnlyIncludes } from '../../intersection/modularIntersectionOnlyIncludes';
import { StaticIntersectionOnlyIncludes } from '../../intersection/staticIntersectionOnlyIncludes';
import { BenchmarkCache } from '../cache';
import { BenchmarkCacheBaseConfig } from '../types';

export type IntersectionConfig = {
  included: ExperimentConfigItem[];
  excluded: ExperimentConfigItem[];
  datasetId: DatasetId;
};

class IntersectionCacheClass extends BenchmarkCache<
  IntersectionConfig,
  IntersectionBase
> {
  readonly keyPrefix = 'intersection';

  protected mapCustomConfigToBaseConfig({
    datasetId,
    excluded,
    included,
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

  protected create(config: IntersectionConfig, key: string): IntersectionBase {
    if (config.excluded.length > 0) {
      return new IntersectionWithExcludes(config);
    } else if (config.included.length === 1 && config.included[0].similarity) {
      return new ModularIntersectionOneInclude(config);
    } else if (config.included.length >= 2 && config.included[0].similarity) {
      return new ModularIntersectionOnlyIncludes(config);
    } else {
      return new StaticIntersectionOnlyIncludes(config);
    }
  }

  protected stringifyExperimentConfigItem(
    item: ExperimentConfigItem,
    config: BenchmarkCacheBaseConfig
  ): string {
    const { excluded, included } = this.mapBaseConfigToCustomConfig(config);
    if (
      excluded.length === 0 &&
      included.length === 1 &&
      included[0].similarity
    ) {
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

export const IntersectionCache = new IntersectionCacheClass();

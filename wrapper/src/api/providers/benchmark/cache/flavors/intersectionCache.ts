import { DatasetId, ExperimentConfigItem } from '../../../../server/types';
import { IntersectionBase } from '../../intersection/intersectionBase';
import { IntersectionWithExcludes } from '../../intersection/intersectionWithExcludes';
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

  protected mapCustomConfigToBaseConfig(
    config: IntersectionConfig
  ): BenchmarkCacheBaseConfig<IntersectionConfig> {
    return {
      datasetId: config.datasetId,
      group1: config.included,
      group2: config.excluded,
      config,
    };
  }

  protected create(config: IntersectionConfig, key: string): IntersectionBase {
    if (config.excluded.length > 0) {
      return new IntersectionWithExcludes(config);
    } else if (config.included.length === 1 && config.included[0].similarity) {
      return new ModularIntersectionOnlyIncludes(config);
    } else {
      return new StaticIntersectionOnlyIncludes(config);
    }
  }

  protected stringifyExperimentConfigItem(
    item: ExperimentConfigItem,
    config: BenchmarkCacheBaseConfig<IntersectionConfig>
  ): string {
    const { excluded, included } = config.config;
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

import { SerializedStoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/serializeCacheKey';
import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';

export interface ConfigurationCacheItem<
  Target,
  Key extends StoreCacheKey = StoreCacheKey
> {
  targets: (Target | undefined)[];
  /**
   * ! WARNING - This may be a different key than the key used to get to this configuration
   * This can happen when the corresponding cacheKeyAndFilter overwrites `prepareSerialization`
   * ! DO NOT USE UNLESS STRICTLY NECESSARY
   */
  INTERNAL_cacheKey: Key;
  dependents: StoreCacheKey[];
}

export type ConfigurationCache<Target> = {
  [key in SerializedStoreCacheKey]?: ConfigurationCacheItem<Target>;
};

export interface ConfigurationStoreModel {
  datasets: ConfigurationCache<DatasetConfigurationModel>;
  algorithms: ConfigurationCache<AlgorithmConfigurationModel>;
  experiments: ConfigurationCache<ExperimentConfigurationModel>;
  simFunctions: ConfigurationCache<SimFunctionConfigurationModel>;
  simThresholds: ConfigurationCache<SimThresholdConfigurationModel>;
  multiSelects: ConfigurationCache<MultiSelectConfigurationModel>;
}

export type DatasetConfigurationModel = number;
export type AlgorithmConfigurationModel = number;
export type ExperimentConfigurationModel = number;
export type SimFunctionConfigurationModel = number;
export type SimThresholdConfigurationModel = number;
export interface MultiSelectConfigurationModel {
  currentIds: number[];
  nextId: number;
}

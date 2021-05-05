import { StoreCacheKey } from 'apps/BenchmarkApp/types/StoreCacheKey';

export interface ConfigurationCacheItem<Target, Filter = undefined> {
  targets: (Target | undefined)[];
  filter: Filter;
}

export type ConfigurationCache<Target, Filter = undefined> = {
  [key in StoreCacheKey]?: ConfigurationCacheItem<Target, Filter>;
};

export interface ConfigurationStoreModel {
  datasets: ConfigurationCache<DatasetConfigurationModel>;
  algorithms: ConfigurationCache<AlgorithmConfigurationModel>;
  experiments: ConfigurationCache<
    ExperimentConfigurationModel,
    ExperimentFilterModel
  >;
  simFunctions: ConfigurationCache<
    SimFunctionConfigurationModel,
    SimFunctionFilterModel
  >;
  simThresholds: ConfigurationCache<SimThresholdConfigurationModel>;
}

export type DatasetConfigurationModel = number;
export type AlgorithmConfigurationModel = number;
export type ExperimentConfigurationModel = number;
export interface ExperimentFilterModel {
  forceDatasetFilter?: StoreCacheKey;
  forceAlgorithmFilter?: StoreCacheKey;
}
export type SimFunctionConfigurationModel = number;
export interface SimFunctionFilterModel {
  forceExperimentFilter?: StoreCacheKey;
}
export type SimThresholdConfigurationModel = number;

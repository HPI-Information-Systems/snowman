import { StoreCacheKey } from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';

export interface ConfigurationCacheItem<Target, Filter = undefined> {
  targets: (Target | undefined)[];
  filter: Filter;
}

export type ConfigurationCache<Target, Filter = undefined> = {
  [key in StoreCacheKey]?: ConfigurationCacheItem<Target, Filter>;
};

export interface ConfigurationStoreModel {
  datasets: ConfigurationCache<DatasetConfigurationModel, DatasetFilterModel>;
  algorithms: ConfigurationCache<
    AlgorithmConfigurationModel,
    AlgorithmFilterModel
  >;
  experiments: ConfigurationCache<
    ExperimentConfigurationModel,
    ExperimentFilterModel
  >;
  simFunctions: ConfigurationCache<
    SimFunctionConfigurationModel,
    SimFunctionFilterModel
  >;
  simThresholds: ConfigurationCache<
    SimThresholdConfigurationModel,
    SimThresholdFilterModel
  >;
}

export type DatasetConfigurationModel = number;
export type DatasetFilterModel = undefined;
export type AlgorithmConfigurationModel = number;
export type AlgorithmFilterModel = undefined;
export type ExperimentConfigurationModel = number;
export interface ExperimentFilterModel {
  forceDatasetFilter?: StoreCacheKey;
  allowMultipleDatasetFilter?: boolean;
  forceAlgorithmFilter?: StoreCacheKey;
  allowMultipleAlgorithmFilter?: boolean;
}
export type SimFunctionConfigurationModel = number;
export interface SimFunctionFilterModel {
  forceExperimentFilter?: StoreCacheKey;
  allowMultipleExperimentFilter?: boolean;
}
export type SimThresholdConfigurationModel = number;
export type SimThresholdFilterModel = undefined;

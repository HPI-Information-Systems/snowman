import { StoreCacheKey } from 'apps/BenchmarkApp/types/StoreCacheKey';

export type ConfigurationCache<Target> = { [key in StoreCacheKey]?: Target };

export type ConfigurationStoreModel = {
  datasets: ConfigurationCache<DatasetConfigurationModel>;
  algorithms: ConfigurationCache<AlgorithmConfigurationModel>;
  experiments: ConfigurationCache<ExperimentConfigurationModel>;
  simFunctions: ConfigurationCache<SimFunctionConfigurationModel>;
  simThresholds: ConfigurationCache<SimThresholdConfigurationModel>;
  multiSelects: ConfigurationCache<MultiSelectConfigurationModel>;
};

export interface SimThresholdConfigurationModel {
  threshold?: number;
}
export interface SimFunctionConfigurationModel {
  functionId?: number;
  forceExperimentFilter?: StoreCacheKey;
}
export interface ExperimentConfigurationModel {
  experimentId?: number;
  forceDatasetFilter?: StoreCacheKey;
  forceAlgorithmFilter?: StoreCacheKey;
}
export interface DatasetConfigurationModel {
  datasetId?: number;
}
export interface AlgorithmConfigurationModel {
  algorithmId?: number;
}
export interface MultiSelectConfigurationModel {
  numberEntries?: number;
}

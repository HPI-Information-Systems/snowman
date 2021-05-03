import { StoreCacheKey } from 'apps/BenchmarkApp/types/StoreCacheKey';

export type ConfigurationStoreModel = {
  datasets: { [key in StoreCacheKey]?: DatasetConfigurationModel };
  algorithms: {
    [key in StoreCacheKey]?: AlgorithmConfigurationModel;
  };
  experiments: {
    [key in StoreCacheKey]?: ExperimentConfigurationModel;
  };
  simFunctions: {
    [key in StoreCacheKey]?: SimFunctionConfigurationModel;
  };
  simThresholds: {
    [key in StoreCacheKey]?: SimThresholdConfigurationModel;
  };
};

export interface SimThresholdConfigurationModel {
  threshold: number;
}
export interface SimFunctionConfigurationModel {
  functionId: number;
  forceExperimentFilter?: StoreCacheKey;
}
export interface ExperimentConfigurationModel {
  experimentId: number;
  forceDatasetFilter?: StoreCacheKey;
  forceAlgorithmFilter?: StoreCacheKey;
}
export interface DatasetConfigurationModel {
  datasetId: number;
}
export interface AlgorithmConfigurationModel {
  algorithmId: number;
}

import { ConfigurationStoreKey } from 'apps/BenchmarkApp/types/ConfigurationStoreKey';

export type ConfigurationStoreModel = {
  dataset: { [key in ConfigurationStoreKey]: DatasetConfigurationModel };
  matchingSolution: {
    [key in ConfigurationStoreKey]: AlgorithmConfigurationModel;
  };
  experiment: {
    [key in ConfigurationStoreKey]: ExperimentConfigurationModel;
  };
  similarityFunction: {
    [key in ConfigurationStoreKey]: SimFunctionConfigurationModel;
  };
  similarityThreshold: {
    [key in ConfigurationStoreKey]: SimThresholdConfigurationModel;
  };
};

export interface SimThresholdConfigurationModel {
  threshold: number;
}
export interface SimFunctionConfigurationModel {
  functionId: number;
  forceExperimentFilter?: ConfigurationStoreKey;
}
export interface ExperimentConfigurationModel {
  experimentId: number;
  forceDatasetFilter?: ConfigurationStoreKey;
  forceAlgorithmFilter?: ConfigurationStoreKey;
}
export interface DatasetConfigurationModel {
  datasetId: number;
}
export interface AlgorithmConfigurationModel {
  algorithmId: number;
}

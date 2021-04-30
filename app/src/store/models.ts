import { Algorithm, Dataset, Experiment } from 'api';

export interface BenchmarkConfigurationStore {
  selectedDatasetCategories: string[];
  selectedDataset: Dataset | null;
  selectedMatchingSolutions: Algorithm[];
  availableExperiments: Experiment[];
  chosenGoldStandards: Experiment[];
  chosenExperiments: Experiment[];
  showExperimentFilters: boolean;
}

export interface ImmediateStore {
  BenchmarkConfigurationStore: BenchmarkConfigurationStore;
}

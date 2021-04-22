import { BenchmarkConfigurationStore } from 'store/models';

const initialState: BenchmarkConfigurationStore = {
  selectedDatasetCategories: [],
  selectedDataset: null,
  selectedMatchingSolutions: [],
  availableExperiments: [],
  chosenGoldStandards: [],
  chosenExperiments: [],
  showExperimentFilters: false,
};

export const BenchmarkConfiguratorReducer = (
  ownState: BenchmarkConfigurationStore = initialState
): BenchmarkConfigurationStore => ownState;

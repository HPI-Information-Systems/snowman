import {
  Algorithm,
  Dataset,
  Experiment,
  ExperimentIntersectionCount,
  Metric,
} from 'api';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';

export interface BenchmarkConfigurationStore {
  selectedDatasetCategories: string[];
  selectedDataset: Dataset | null;
  selectedMatchingSolutions: Algorithm[];
  availableExperiments: Experiment[];
  chosenGoldStandards: Experiment[];
  chosenExperiments: Experiment[];
  showExperimentFilters: boolean;
}

export interface BinaryMetricsStore {
  counts: ExperimentIntersectionCount[];
  metrics: Metric[];
  selectedDataView: MetricsTuplesCategories;
}

export interface ImmediateStore {
  BenchmarkConfigurationStore: BenchmarkConfigurationStore;
  BinaryMetricsStore: BinaryMetricsStore;
}

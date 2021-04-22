import {
  Algorithm,
  Dataset,
  Experiment,
  ExperimentIntersectionCount,
  Metric,
} from 'api';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';

export interface SelectableInputStore {
  shouldShowPopover: boolean;
  eventPopover: Event | undefined;
  searchString: string;
}

export interface CoreStore {
  algorithms: Algorithm[];
  datasets: Dataset[];
  experiments: Experiment[];
}

export interface BenchmarkConfigurationStore {
  selectedDatasetCategories: string[];
  selectedDataset: Dataset | null;
  selectedMatchingSolutions: Algorithm[];
  availableExperiments: Experiment[];
  chosenGoldStandards: Experiment[];
  chosenExperiments: Experiment[];
  showExperimentFilters: boolean;
}

export interface DatasetPreviewerStore {
  isOpen: boolean;
  dataset: Dataset | undefined;
}

export interface ExperimentPreviewerStore {
  isOpen: boolean;
  experiment: Experiment | undefined;
}

export interface IntersectionStore {
  included: Experiment[];
  excluded: Experiment[];
  ignored: Experiment[];
  // experiments are guaranteed to be sorted by intersectionCountSorter (see IntersectionStoreActions.ts)
  counts: ExperimentIntersectionCount[];
}

export interface BinaryMetricsStore {
  counts: ExperimentIntersectionCount[];
  metrics: Metric[];
  selectedDataView: MetricsTuplesCategories;
}

export interface NMetricsStore {
  metrics: Metric[][];
}

export interface ImmediateStore {
  CoreStore: CoreStore;
  BenchmarkConfigurationStore: BenchmarkConfigurationStore;
  BinaryMetricsStore: BinaryMetricsStore;
  NMetricsStore: NMetricsStore;
  SelectableInputStore: SelectableInputStore;
  DatasetPreviewerStore: DatasetPreviewerStore;
  ExperimentPreviewerStore: ExperimentPreviewerStore;
  IntersectionStore: IntersectionStore;
}

import {
  Algorithm,
  Dataset,
  Experiment,
  ExperimentIntersection,
  Metric,
} from 'api';
import { DatasetTypes } from 'types/DatasetTypes';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';

export interface AlgorithmDialogStore {
  algorithmId: number | null;
  algorithmName: string;
  algorithmDescription: string;
  isOpen: boolean;
}

export interface AddDatasetDialogStore {
  isOpen: boolean;
  datasetName: string;
  datasetDescription: string;
  datasetType: DatasetTypes;
  datasetLength: number;
  csvIdColumn: string;
  csvSeparator: string;
  csvQuote: string;
  csvEscape: string;
  availableTags: string[];
  selectedTags: string[];
  selectedFiles: File[];
}

export interface AddExperimentDialogStore {
  isOpen: boolean;
  experimentName: string;
  experimentDescription: string;
  experimentFileFormat: experimentFileFormatEnum;
  selectedTags: string[];
  selectedFiles: File[];
}

export interface AlgorithmsStore {
  algorithms: Algorithm[];
}

export interface DatasetsStore {
  datasets: Dataset[];
  selectedDatasetTags: string[];
  selectedDataset: Dataset | null;
}

export interface ExperimentsStore {
  experiments: Experiment[];
  selectedExperimentsTags: string[];
  selectedExperiments: number[];
}

export interface GlobalIndicatorStore {
  showLoading: boolean;
  ongoingRequestsCount: number;
}

export interface InputChipStore {
  newChipValue: string;
  shouldShowInput: boolean;
}

export interface MetricsStore {
  metrics: Metric[];
  falsePositives: ExperimentIntersection | undefined;
  falseNegatives: ExperimentIntersection | undefined;
  truePositives: ExperimentIntersection | undefined;
  selectedDataView: MetricsTuplesCategories;
}

export interface Store {
  DatasetsStore: DatasetsStore;
  ExperimentsStore: ExperimentsStore;
  AlgorithmsStore: AlgorithmsStore;
  AddDatasetDialogStore: AddDatasetDialogStore;
  AddExperimentDialogStore: AddExperimentDialogStore;
  AlgorithmDialogStore: AlgorithmDialogStore;
  GlobalIndicatorStore: GlobalIndicatorStore;
  MetricsStore: MetricsStore;
  InputChipStore: InputChipStore;
}

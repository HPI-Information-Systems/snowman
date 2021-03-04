import {
  Algorithm,
  Dataset,
  Experiment,
  ExperimentIntersection,
  Metric,
} from 'api';
import { ViewIDs } from 'store/reducers/rootReducer';
import { DatasetTypes } from 'types/DatasetTypes';
import { DialogTypes } from 'types/DialogTypes';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';

export interface RenderLogicStore {
  currentViewID: ViewIDs;
  couldGoNext: boolean;
}

export interface AlgorithmDialogStore {
  algorithmId: number | null;
  algorithmName: string;
  algorithmDescription: string;
  isOpen: boolean;
  dialogType: DialogTypes;
}

export interface DatasetDialogStore {
  datasetId: number | null;
  dialogType: DialogTypes;
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

export interface ImmediateStore {
  DatasetsStore: DatasetsStore;
  ExperimentsStore: ExperimentsStore;
  AlgorithmsStore: AlgorithmsStore;
  DatasetDialogStore: DatasetDialogStore;
  AddExperimentDialogStore: AddExperimentDialogStore;
  AlgorithmDialogStore: AlgorithmDialogStore;
  GlobalIndicatorStore: GlobalIndicatorStore;
  MetricsStore: MetricsStore;
  InputChipStore: InputChipStore;
}

export interface Store extends ImmediateStore {
  RenderLogicStore: RenderLogicStore;
}

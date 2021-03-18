import { Algorithm, Dataset, Experiment, FileResponse, Metric } from 'api';
import { DatasetTypes } from 'types/DatasetTypes';
import { DialogTypes } from 'types/DialogTypes';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';
import { ViewIDs } from 'types/ViewIDs';

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

export interface ExperimentDialogStore {
  dialogType: DialogTypes;
  isOpen: boolean;
  experimentId: number | null;
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

export interface SelectableInputStore {
  shouldShowPopover: boolean;
  eventPopover: Event | undefined;
  searchString: string;
}

export interface MetricsStore {
  metrics: Metric[];
  falsePositives: FileResponse | undefined;
  falseNegatives: FileResponse | undefined;
  truePositives: FileResponse | undefined;
  selectedDataView: MetricsTuplesCategories;
}

export interface ImmediateStore {
  DatasetsStore: DatasetsStore;
  ExperimentsStore: ExperimentsStore;
  AlgorithmsStore: AlgorithmsStore;
  DatasetDialogStore: DatasetDialogStore;
  ExperimentDialogStore: ExperimentDialogStore;
  AlgorithmDialogStore: AlgorithmDialogStore;
  GlobalIndicatorStore: GlobalIndicatorStore;
  MetricsStore: MetricsStore;
  InputChipStore: InputChipStore;
  SelectableInputStore: SelectableInputStore;
}

export interface Store extends ImmediateStore {
  RenderLogicStore: RenderLogicStore;
}

import {
  Algorithm,
  AlgorithmValuesSoftKPIsImplementationKnowHowLevelEnum,
  AlgorithmValuesSoftKPIsMatchingSolutionTypeEnum,
  Dataset,
  Experiment,
  ExperimentIntersectionCount,
  Metric,
} from 'api';
import { DatasetTypes } from 'types/DatasetTypes';
import { DialogTypes } from 'types/DialogTypes';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';
import { ViewIDs } from 'types/ViewIDs';

export interface AlgorithmDialogStore {
  algorithmId: number | null;
  algorithmName: string;
  algorithmDescription: string;
  implementationKnowHowLevel:
    | AlgorithmValuesSoftKPIsImplementationKnowHowLevelEnum
    | undefined;
  matchingSolutionType:
    | AlgorithmValuesSoftKPIsMatchingSolutionTypeEnum
    | undefined;
  timeToConfigure: number | undefined;
  timeToInstall: number | undefined;
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
  timeToConfigure: number | undefined;
  experimentFileFormat: experimentFileFormatEnum;
  selectedTags: string[];
  selectedFiles: File[];
}

export interface GlobalIndicatorStore {
  showLoading: boolean;
  ongoingRequestsCount: number;
}

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

export interface RenderLogicStore {
  currentViewID: ViewIDs;
  couldGoNext: boolean;
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
  AlgorithmDialogStore: AlgorithmDialogStore;
  DatasetDialogStore: DatasetDialogStore;
  ExperimentDialogStore: ExperimentDialogStore;
  BenchmarkConfigurationStore: BenchmarkConfigurationStore;
  BinaryMetricsStore: BinaryMetricsStore;
  NMetricsStore: NMetricsStore;
  GlobalIndicatorStore: GlobalIndicatorStore;
  SelectableInputStore: SelectableInputStore;
  DatasetPreviewerStore: DatasetPreviewerStore;
  ExperimentPreviewerStore: ExperimentPreviewerStore;
  IntersectionStore: IntersectionStore;
}

export interface Store extends ImmediateStore {
  RenderLogicStore: RenderLogicStore;
}

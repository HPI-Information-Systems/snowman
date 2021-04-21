import { Experiment } from 'api';
import { ExperimentDialogActionTypes } from 'apps/ExperimentDialog/types/ExperimentDialogActionTypes';
import { ExperimentDialogModel } from 'apps/ExperimentDialog/types/ExperimentDialogModel';
import { CentralResourcesGenericActionsTypes } from 'apps/SnowmanApp/types/CentralResourcesGenericActionsTypes';
import { CentralResourcesModel } from 'apps/SnowmanApp/types/CentralResourcesModel';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: ExperimentDialogModel = {
  experimentName: '',
  experimentDescription: '',
  experimentFileFormat: experimentFileFormatEnum.Pilot,
  selectedFiles: [],
  datasets: [],
  algorithms: [],
  selectedDataset: undefined,
  selectedAlgorithm: undefined,
};

const ExperimentDialogReducer = (
  state: ExperimentDialogModel = initialState,
  action: SnowmanAction
): ExperimentDialogModel => {
  switch (action.type) {
    case CentralResourcesGenericActionsTypes.REFRESHED: {
      return {
        ...state,
        datasets: (action.payload as CentralResourcesModel).datasets,
        algorithms: (action.payload as CentralResourcesModel).algorithms,
      };
    }
    case ExperimentDialogActionTypes.RESET_DIALOG:
      return {
        ...initialState,
        datasets: state.datasets,
        algorithms: state.algorithms,
      };
    case ExperimentDialogActionTypes.PREFILL_DIALOG: {
      const experiment = action.payload as Experiment;
      return {
        ...initialState,
        datasets: state.datasets,
        algorithms: state.algorithms,
        selectedDataset: experiment.datasetId.toString(),
        selectedAlgorithm: experiment.algorithmId.toString(),
        experimentName: experiment.name,
        experimentDescription: experiment.description ?? '',
      };
    }
    case ExperimentDialogActionTypes.CHANGE_EXPERIMENT_NAME:
      return {
        ...state,
        experimentName: action.payload as string,
      };
    case ExperimentDialogActionTypes.CHANGE_EXPERIMENT_DESCRIPTION:
      return {
        ...state,
        experimentDescription: action.payload as string,
      };
    case ExperimentDialogActionTypes.CHANGE_EXPERIMENT_FORMAT:
      return {
        ...state,
        experimentFileFormat: action.payload as experimentFileFormatEnum,
      };
    case ExperimentDialogActionTypes.CHANGE_SELECTED_FILES:
      return {
        ...state,
        selectedFiles: action.payload as File[],
      };
    case ExperimentDialogActionTypes.CHANGE_DATASET:
      return {
        ...state,
        selectedDataset: action.payload as string,
      };
    case ExperimentDialogActionTypes.CHANGE_ALGORITHM:
      return {
        ...state,
        selectedAlgorithm: action.payload as string,
      };
    default:
      return state;
  }
};

export default ExperimentDialogReducer;

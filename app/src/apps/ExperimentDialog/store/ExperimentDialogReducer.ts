import { ExperimentDialogActionTypes } from 'apps/ExperimentDialog/types/ExperimentDialogActionTypes';
import { ExperimentDialogModel } from 'apps/ExperimentDialog/types/ExperimentDialogModel';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';
import { SnowmanAction } from 'types/SnowmanAction';
import { toggleSelectionArraySingleSelect } from 'utils/toggleSelectionArray';

const initialState: ExperimentDialogModel = {
  experimentName: '',
  experimentDescription: '',
  timeToConfigure: undefined,
  experimentFileFormat: experimentFileFormatEnum.Pilot,
  selectedTags: [],
  selectedFiles: [],
};

const ExperimentDialogReducer = (
  state: ExperimentDialogModel = initialState,
  action: SnowmanAction
): ExperimentDialogModel => {
  switch (action.type) {
    case ExperimentDialogActionTypes.RESET_DIALOG:
      return initialState;
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
    case ExperimentDialogActionTypes.CLICK_ON_MATCHING_SOLUTION_TAG:
      return {
        ...state,
        selectedTags: toggleSelectionArraySingleSelect<string>(
          state.selectedTags,
          action.payload as string
        ),
      };
    default:
      return state;
  }
};

export default ExperimentDialogReducer;

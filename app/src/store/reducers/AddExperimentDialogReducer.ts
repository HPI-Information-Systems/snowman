import { AddExperimentDialogStoreActionTypes as actionTypes } from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { AddExperimentDialogStore } from 'store/models';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';
import { toggleSelectionArraySingleSelect } from 'utils/toggleSelectionArray';

const initialState: AddExperimentDialogStore = {
  isOpen: false,
  experimentName: '',
  experimentDescription: '',
  experimentFileFormat: experimentFileFormatEnum.Pilot,
  selectedTags: [],
  selectedFiles: [],
};

export const AddExperimentDialogReducer = (
  state: AddExperimentDialogStore = initialState,
  action: SnowmanAction
): AddExperimentDialogStore => {
  switch (action.type) {
    case actionTypes.OPEN_DIALOG:
      return {
        ...state,
        isOpen: true,
      };
    case actionTypes.CLOSE_DIALOG:
      return {
        ...state,
        isOpen: false,
      };
    case actionTypes.CHANGE_EXPERIMENT_NAME:
      return {
        ...state,
        experimentName: action.payload as string,
      };
    case actionTypes.CHANGE_EXPERIMENT_DESCRIPTION:
      return {
        ...state,
        experimentDescription: action.payload as string,
      };
    case actionTypes.CHANGE_EXPERIMENT_FORMAT:
      return {
        ...state,
        experimentFileFormat: action.payload as experimentFileFormatEnum,
      };
    case actionTypes.RESET_DIALOG:
      return initialState;
    case actionTypes.CHANGE_SELECTED_FILES:
      return {
        ...state,
        selectedFiles: action.payload as File[],
      };
    case actionTypes.CLICK_ON_MATCHING_SOLUTION_TAG:
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

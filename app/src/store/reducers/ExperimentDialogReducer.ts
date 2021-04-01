import {
  Algorithm,
  Experiment,
  ExperimentValuesSoftKPIs,
  ExperimentValuesSoftKPIsImplementationKnowHowLevelEnum,
} from 'api';
import { SoftKPIsTypesEnum } from 'components/ExperimentDialog/ExperimentDialogProps';
import { ExperimentDialogStoreActionTypes as actionTypes } from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { ExperimentDialogStore } from 'store/models';
import { DialogTypes } from 'types/DialogTypes';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';
import { getAlgorithmNameFromId } from 'utils/algorithmHelpers';
import { parseInputToNumberOrUndef } from 'utils/questionHelpers';
import { toggleSelectionArraySingleSelect } from 'utils/toggleSelectionArray';

const initialState: ExperimentDialogStore = {
  dialogType: DialogTypes.ADD_DIALOG,
  isOpen: false,
  experimentId: null,
  experimentName: '',
  experimentDescription: '',
  softKPIs: {},
  experimentFileFormat: experimentFileFormatEnum.Pilot,
  selectedTags: [],
  selectedFiles: [],
};

export const ExperimentDialogReducer = (
  state: ExperimentDialogStore = initialState,
  action: SnowmanAction
): ExperimentDialogStore => {
  switch (action.type) {
    case actionTypes.OPEN_ADD_DIALOG:
      return {
        ...state,
        dialogType: DialogTypes.ADD_DIALOG,
        isOpen: true,
      };
    case actionTypes.OPEN_CHANGE_DIALOG:
      return {
        ...state,
        dialogType: DialogTypes.CHANGE_DIALOG,
        isOpen: true,
        experimentId: (action.payload as Experiment).id,
        experimentName: (action.payload as Experiment).name,
        experimentDescription: (action.payload as Experiment).description ?? '',
        softKPIs: (action.payload as Experiment).softKPIs ?? {},
        selectedTags: [
          getAlgorithmNameFromId(
            (action.payload as Experiment).algorithmId,
            action.optionalPayload as Algorithm[]
          ),
        ],
      };
    case actionTypes.CLOSE_DIALOG:
      if (state.dialogType === DialogTypes.ADD_DIALOG)
        // Only keep current state for add dialog
        return {
          ...state,
          isOpen: false,
        };
      else {
        return initialState;
      }
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
    case actionTypes.UPDATE_SOFT_KPIS:
      return {
        ...state,
        softKPIs: SoftKPIsReducer(state.softKPIs, action),
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

const SoftKPIsReducer = (
  state: ExperimentValuesSoftKPIs,
  action: SnowmanAction
): ExperimentValuesSoftKPIs => {
  switch (action.payload as SoftKPIsTypesEnum) {
    case SoftKPIsTypesEnum.timeToConfigure:
      return {
        ...state,
        timeToConfigure: parseInputToNumberOrUndef(
          action.optionalPayload as string | undefined
        ),
      };
    case SoftKPIsTypesEnum.implementationKnowHowLevel:
      return {
        ...state,
        implementationKnowHowLevel: action.optionalPayload as ExperimentValuesSoftKPIsImplementationKnowHowLevelEnum,
      };
    default:
      return state;
  }
};

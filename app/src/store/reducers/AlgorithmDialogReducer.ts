import {
  Algorithm,
  AlgorithmValuesSoftKPIsImplementationKnowHowLevelEnum,
  AlgorithmValuesSoftKPIsMatchingSolutionTypeEnum,
} from 'api';
import { AlgorithmDialogStoreActionTypes as DialogActions } from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { AlgorithmDialogStore } from 'store/models';
import { DialogTypes } from 'types/DialogTypes';

const initialState: AlgorithmDialogStore = {
  isOpen: false,
  algorithmId: null,
  algorithmName: '',
  algorithmDescription: '',
  dialogType: DialogTypes.ADD_DIALOG,
  implementationKnowHowLevel: undefined,
  matchingSolutionType: undefined,
  timeToConfigure: undefined,
  timeToInstall: undefined,
};

export const AlgorithmDialogReducer = (
  state: AlgorithmDialogStore = initialState,
  action: SnowmanAction
): AlgorithmDialogStore => {
  switch (action.type) {
    case DialogActions.OPEN_ADD_DIALOG:
      return {
        ...state,
        isOpen: true,
        dialogType: DialogTypes.ADD_DIALOG,
      };
    case DialogActions.OPEN_CHANGE_DIALOG:
      return {
        ...state,
        isOpen: true,
        algorithmId: (action.payload as Algorithm).id,
        algorithmName: (action.payload as Algorithm).name,
        algorithmDescription: (action.payload as Algorithm).description ?? '',
        matchingSolutionType: (action.payload as Algorithm).softKPIs
          ?.matchingSolutionType,
        timeToConfigure: (action.payload as Algorithm).softKPIs
          ?.timeToConfigure,
        timeToInstall: (action.payload as Algorithm).softKPIs?.timeToInstall,
        dialogType: DialogTypes.CHANGE_DIALOG,
      };
    case DialogActions.CLOSE_DIALOG:
      if (state.dialogType === DialogTypes.ADD_DIALOG)
        // Only keep current state for add dialog
        return {
          ...state,
          isOpen: false,
        };
      else {
        return initialState;
      }
    case DialogActions.CHANGE_ALGORITHM_NAME:
      return {
        ...state,
        algorithmName: action.payload as string,
      };
    case DialogActions.CHANGE_SOFT_KPI_IMPLEMENTATION_KNOW_HOW_LEVEL:
      return {
        ...state,
        implementationKnowHowLevel: action.payload as
          | AlgorithmValuesSoftKPIsImplementationKnowHowLevelEnum
          | undefined,
      };
    case DialogActions.CHANGE_SOFT_KPI_MATCHING_SOLUTION_TYPE:
      return {
        ...state,
        matchingSolutionType: action.payload as AlgorithmValuesSoftKPIsMatchingSolutionTypeEnum,
      };
    case DialogActions.CHANGE_SOFT_KPI_TIME_TO_INSTALL:
      return {
        ...state,
        timeToInstall: action.payload as number | undefined,
      };
    case DialogActions.CHANGE_SOFT_KPI_TIME_TO_CONFIGURE:
      return {
        ...state,
        timeToConfigure: action.payload as number | undefined,
      };
    case DialogActions.RESET_DIALOG:
      return initialState;
    case DialogActions.CHANGE_ALGORITHM_DESCRIPTION:
      return {
        ...state,
        algorithmDescription: action.payload as string,
      };
    default:
      return state;
  }
};

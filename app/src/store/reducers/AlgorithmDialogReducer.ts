import { Algorithm } from 'api';
import { AlgorithmDialogStoreActionTypes as DialogActions } from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { AlgorithmDialogStore } from 'store/models';

const initialState: AlgorithmDialogStore = {
  isOpen: false,
  algorithmId: null,
  algorithmName: '',
  algorithmDescription: '',
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
      };
    case DialogActions.OPEN_CHANGE_DIALOG:
      return {
        ...state,
        isOpen: true,
        algorithmId: (action.payload as Algorithm).id,
        algorithmName: (action.payload as Algorithm).name,
        algorithmDescription: (action.payload as Algorithm).description ?? '',
      };
    case DialogActions.CLOSE_DIALOG:
      return {
        ...state,
        isOpen: false,
        algorithmId: null,
      };
    case DialogActions.CHANGE_ALGORITHM_NAME:
      return {
        ...state,
        algorithmName: action.payload as string,
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

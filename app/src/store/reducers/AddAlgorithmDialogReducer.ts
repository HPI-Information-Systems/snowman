import { Algorithm } from 'api';
import { AddAlgorithmDialogStoreActionTypes as DialogActions } from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { AddAlgorithmDialogStore } from 'store/models';

const initialState: AddAlgorithmDialogStore = {
  isOpen: false,
  algorithmId: null,
  algorithmName: '',
  algorithmDescription: '',
};

export const AddAlgorithmDialogReducer = (
  state: AddAlgorithmDialogStore = initialState,
  action: SnowmanAction
): AddAlgorithmDialogStore => {
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

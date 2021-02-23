import { AddAlgorithmDialogStoreActionTypes as DialogActions } from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { AddAlgorithmDialogStore } from 'store/models';

const initialState: AddAlgorithmDialogStore = {
  isOpen: false,
  algorithmName: '',
  algorithmDescription: '',
};

export const AddAlgorithmDialogReducer = (
  state: AddAlgorithmDialogStore = initialState,
  action: SnowmanAction
): AddAlgorithmDialogStore => {
  switch (action.type) {
    case DialogActions.OPEN_DIALOG:
      return {
        ...state,
        isOpen: true,
      };
    case DialogActions.CLOSE_DIALOG:
      return {
        ...state,
        isOpen: false,
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

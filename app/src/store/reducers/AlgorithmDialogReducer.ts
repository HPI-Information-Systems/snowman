import { Algorithm } from 'api';
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
        ...initialState,
        isOpen: true,
        algorithmId: (action.payload as Algorithm).id,
        algorithmName: (action.payload as Algorithm).name,
        algorithmDescription: (action.payload as Algorithm).description ?? '',
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

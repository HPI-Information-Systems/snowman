import { AlgorithmApi } from 'api';
import { AddAlgorithmDialogStoreActionTypes as DialogActions } from 'store/actions/actionTypes';
import { getAlgorithms } from 'store/actions/AlgorithmsStoreActions';
import { SnowmanDispatch, SnowmanThunkAction } from 'store/messages';
import { store } from 'store/store';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';
import RequestHandler from 'utils/requestHandler';
import { SUCCESS_TO_ADD_NEW_ALGORITHM } from 'utils/statusMessages';

export const openDialog = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActions.OPEN_DIALOG,
    // reducer ignores payload
    payload: false,
  });

export const closeDialog = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActions.CLOSE_DIALOG,
    // reducer ignores payload
    payload: false,
  });

export const changeAlgorithmName = (aName: string): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActions.CHANGE_ALGORITHM_NAME,
    payload: aName,
  });

export const changeAlgorithmDescription = (
  aDescription: string
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActions.CHANGE_ALGORITHM_DESCRIPTION,
    payload: aDescription,
  });

export const resetDialog = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActions.RESET_DIALOG,
    // reducer ignores payload
    payload: false,
  });

export const addAlgorithm = (): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> =>
  RequestHandler<void>(
    (): Promise<void> =>
      new AlgorithmApi()
        .addAlgorithm({
          algorithmValues: {
            name: store.getState().AddAlgorithmDialogStore.algorithmName,
            description: store.getState().AddAlgorithmDialogStore
              .algorithmDescription,
          },
        })
        .then((): void => {
          dispatch(resetDialog());
        })
        .finally((): void => {
          dispatch(closeDialog());
          dispatch(getAlgorithms());
        }),
    dispatch,
    SUCCESS_TO_ADD_NEW_ALGORITHM
  );

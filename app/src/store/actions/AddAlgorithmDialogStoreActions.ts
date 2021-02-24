import { Algorithm, AlgorithmApi } from 'api';
import { AddAlgorithmDialogStoreActionTypes as DialogActions } from 'store/actions/actionTypes';
import { getAlgorithms } from 'store/actions/AlgorithmsStoreActions';
import { SnowmanDispatch, SnowmanThunkAction } from 'store/messages';
import { store } from 'store/store';
import { MagicNotPossibleId } from 'utils/constants';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';
import RequestHandler from 'utils/requestHandler';
import {
  SUCCESS_TO_ADD_NEW_ALGORITHM,
  SUCCESS_UPDATE_ALGORITHM,
} from 'utils/statusMessages';

export const openAddDialog = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActions.OPEN_ADD_DIALOG,
    // reducer ignores payload
    payload: false,
  });

export const openChangeDialog = (
  algorithmId: number
): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> => {
  return RequestHandler(
    (): Promise<void> =>
      new AlgorithmApi()
        .getAlgorithm({ algorithmId: algorithmId })
        .then((anAlgorithm: Algorithm) =>
          dispatch({
            type: DialogActions.OPEN_CHANGE_DIALOG,
            payload: anAlgorithm,
          })
        )
        .then(),
    dispatch
  );
};

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

const addAlgorithm = (): SnowmanThunkAction<Promise<void>> => async (
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

const updateAlgorithm = (): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> =>
  RequestHandler(
    (): Promise<void> =>
      new AlgorithmApi()
        .setAlgorithm({
          algorithmId:
            store.getState().AddAlgorithmDialogStore.algorithmId ??
            MagicNotPossibleId,
          algorithmValues: {
            description: store.getState().AddAlgorithmDialogStore
              .algorithmDescription,
            name: store.getState().AddAlgorithmDialogStore.algorithmName,
          },
        })
        .then((): void => dispatch(resetDialog()))
        .finally((): void => {
          dispatch(closeDialog());
          dispatch(getAlgorithms());
        }),
    dispatch,
    SUCCESS_UPDATE_ALGORITHM
  );

export const addOrUpdateAlgorithm = (): SnowmanThunkAction<
  Promise<void>
> => async (dispatch: SnowmanDispatch): Promise<void> => {
  if (store.getState().AddAlgorithmDialogStore.algorithmId === null) {
    return dispatch(addAlgorithm());
  }
  return dispatch(updateAlgorithm());
};

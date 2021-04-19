import { Algorithm, AlgorithmApi, AlgorithmValues } from 'api';
import { AlgorithmDialogModel } from 'components/AlgorithmDialog/types/AlgorithmDialogModel';
import { AlgorithmDialogStoreActionTypes as DialogActions } from 'store/actions/actionTypes';
import { getAlgorithms } from 'store/actions/AlgorithmsPageActions';
import { SnowmanDispatch, SnowmanThunkAction } from 'store/messages';
import { store } from 'store/store';
import { MagicNotPossibleId } from 'structs/constants';
import {
  SUCCESS_TO_ADD_NEW_ALGORITHM,
  SUCCESS_TO_UPDATE_ALGORITHM,
} from 'structs/statusMessages';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';
import RequestHandler from 'utils/requestHandler';

export const changeAlgorithmName = (
  aName: string
): easyPrimitiveActionReturn<AlgorithmDialogModel> =>
  easyPrimitiveAction<AlgorithmDialogModel>({
    type: DialogActions.CHANGE_ALGORITHM_NAME,
    payload: aName,
  });

export const changeAlgorithmDescription = (
  aDescription: string
): easyPrimitiveActionReturn<AlgorithmDialogModel> =>
  easyPrimitiveAction({
    type: DialogActions.CHANGE_ALGORITHM_DESCRIPTION,
    payload: aDescription,
  });

/*const getAlgorithmValues = (): AlgorithmValues => ({
  name: store.getState().AlgorithmDialogStore.algorithmName,
  description: store.getState().AlgorithmDialogStore.algorithmDescription,
});

const addAlgorithm = (): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> =>
  RequestHandler<void>(
    (): Promise<void> =>
      new AlgorithmApi()
        .addAlgorithm({
          algorithm: getAlgorithmValues(),
        })
        .then((): void => {
          dispatch(resetDialog());
        })
        .finally((): void => {
          dispatch(closeDialog());
          dispatch(getAlgorithms());
        }),
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
            store.getState().AlgorithmDialogStore.algorithmId ??
            MagicNotPossibleId,
          algorithm: getAlgorithmValues(),
        })
        .then((): void => dispatch(resetDialog()))
        .finally((): void => {
          dispatch(closeDialog());
          dispatch(getAlgorithms());
        }),
    SUCCESS_TO_UPDATE_ALGORITHM
  );

export const addOrUpdateAlgorithm = (): SnowmanThunkAction<
  Promise<void>
> => async (dispatch: SnowmanDispatch): Promise<void> => {
  if (store.getState().AlgorithmDialogStore.algorithmId === null) {
    return dispatch(addAlgorithm());
  }
  return dispatch(updateAlgorithm());
};*/

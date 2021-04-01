import { Algorithm, AlgorithmApi, AlgorithmValues } from 'api';
import {
  SoftKPIsGeneralTypesEnum,
  SoftKPIsInstallationTypesEnum,
} from 'components/AlgorithmDialog/AlgorithmDialogProps';
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

export const updateSoftKPIsGeneral = (
  type: SoftKPIsGeneralTypesEnum,
  value: unknown
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActions.UPDATE_SOFT_KPIS_GENERAL,
    payload: type,
    optionalPayload: value,
  });

export const updateSoftKPIsInstallation = (
  type: SoftKPIsInstallationTypesEnum,
  value: unknown
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActions.UPDATE_SOFT_KPIS_INSTALLATION,
    payload: type,
    optionalPayload: value,
  });

export const resetDialog = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActions.RESET_DIALOG,
    // reducer ignores payload
    payload: false,
  });

const getAlgorithmValues = (): AlgorithmValues => ({
  name: store.getState().AlgorithmDialogStore.algorithmName,
  description: store.getState().AlgorithmDialogStore.algorithmDescription,
  softKPIs: {
    general: store.getState().AlgorithmDialogStore.softKPIsGeneral,
    installationCosts: store.getState().AlgorithmDialogStore
      .softKPIsInstallation,
  },
});

const addAlgorithm = (): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> =>
  RequestHandler<void>(
    (): Promise<void> =>
      new AlgorithmApi()
        .addAlgorithm({
          algorithmValues: getAlgorithmValues(),
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
            store.getState().AlgorithmDialogStore.algorithmId ??
            MagicNotPossibleId,
          algorithmValues: getAlgorithmValues(),
        })
        .then((): void => dispatch(resetDialog()))
        .finally((): void => {
          dispatch(closeDialog());
          dispatch(getAlgorithms());
        }),
    dispatch,
    SUCCESS_TO_UPDATE_ALGORITHM
  );

export const addOrUpdateAlgorithm = (): SnowmanThunkAction<
  Promise<void>
> => async (dispatch: SnowmanDispatch): Promise<void> => {
  if (store.getState().AlgorithmDialogStore.algorithmId === null) {
    return dispatch(addAlgorithm());
  }
  return dispatch(updateAlgorithm());
};

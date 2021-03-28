import {
  Algorithm,
  AlgorithmApi,
  AlgorithmValues,
  AlgorithmValuesSoftKPIsImplementationKnowHowLevelEnum,
  AlgorithmValuesSoftKPIsMatchingSolutionTypeEnum,
} from 'api';
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

export const changeSoftKPIImplementationKnowHowLevel = (
  anLevel: AlgorithmValuesSoftKPIsImplementationKnowHowLevelEnum | undefined
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActions.CHANGE_SOFT_KPI_IMPLEMENTATION_KNOW_HOW_LEVEL,
    payload: anLevel,
  });

export const changeSoftKPIMatchingSolutionType = (
  aType: AlgorithmValuesSoftKPIsMatchingSolutionTypeEnum
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActions.CHANGE_SOFT_KPI_MATCHING_SOLUTION_TYPE,
    payload: aType,
  });

export const changeSoftKPITimeToInstall = (
  anInstallTime: number | undefined
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActions.CHANGE_SOFT_KPI_TIME_TO_INSTALL,
    payload: anInstallTime,
  });

export const changeSoftKPITimeToConfigure = (
  aConfigureTime: number | undefined
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActions.CHANGE_SOFT_KPI_TIME_TO_CONFIGURE,
    payload: aConfigureTime,
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
    implementationKnowHowLevel: store.getState().AlgorithmDialogStore
      .implementationKnowHowLevel,
    matchingSolutionType: store.getState().AlgorithmDialogStore
      .matchingSolutionType,
    timeToConfigure: store.getState().AlgorithmDialogStore.timeToConfigure,
    timeToInstall: store.getState().AlgorithmDialogStore.timeToInstall,
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

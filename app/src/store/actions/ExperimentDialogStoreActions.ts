import 'types/ExperimentFileFormats';

import { Experiment, ExperimentsApi } from 'api';
import { ExperimentDialogStoreActionTypes as actionTypes } from 'store/actions/actionTypes';
import { getExperiments } from 'store/actions/ExperimentsPageActions';
import { SnowmanDispatch, SnowmanThunkAction } from 'store/messages';
import { store } from 'store/store';
import { MagicNotPossibleId } from 'structs/constants';
import {
  SUCCESS_TO_ADD_NEW_EXPERIMENT,
  SUCCESS_TO_UPDATE_EXPERIMENT,
  SUCCESS_TO_UPLOAD_EXPERIMENT_FILE,
} from 'structs/statusMessages';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';
import { getAlgorithmIdFromName } from 'utils/algorithmHelpers';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';
import RequestHandler from 'utils/requestHandler';

import { ToastType } from '../../types/ToastTypes';
import { showToast } from './GlobalIndicatorActions';

export const openAddDialog = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.OPEN_ADD_DIALOG,
    // reducer ignores payload
    payload: false,
  });

export const openChangeDialog = (
  anExperiment: Experiment
): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> => {
  return RequestHandler(
    (): Promise<void> =>
      new ExperimentsApi()
        .getExperiment({ experimentId: anExperiment.id })
        .then((anExperiment: Experiment): void => {
          dispatch({
            type: actionTypes.OPEN_CHANGE_DIALOG,
            payload: anExperiment,
            optionalPayload: store.getState().CoreStore.algorithms,
          });
        }),
    dispatch
  );
};

export const closeDialog = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.CLOSE_DIALOG,
    // reducer ignores payload
    payload: false,
  });

export const changeExperimentName = (
  aName: string
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.CHANGE_EXPERIMENT_NAME,
    payload: aName,
  });

export const changeExperimentDescription = (
  aDescription: string
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.CHANGE_EXPERIMENT_DESCRIPTION,
    payload: aDescription,
  });

export const changeFileFormat = (
  aFormat: experimentFileFormatEnum
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.CHANGE_EXPERIMENT_FORMAT,
    payload: aFormat,
  });

export const resetDialog = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.RESET_DIALOG,
    // payload is not used
    payload: true,
  });

export const clickOnMatchingSolutionTag = (
  aTag: string
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.CLICK_ON_MATCHING_SOLUTION_TAG,
    payload: aTag,
  });

export const changeSelectedFiles = (files: File[]): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.CHANGE_SELECTED_FILES,
    payload: files,
  });

export const changeSoftKPITimeToConfigure = (
  aConfigurationTime: number | undefined
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.CHANGE_SOFT_KPI_TIME_TO_CONFIGURE,
    payload: aConfigurationTime,
  });

const createNewExperiment = (
  showSuccess = true
): SnowmanThunkAction<Promise<number>> => async (
  dispatch: SnowmanDispatch
): Promise<number> =>
  RequestHandler<number>(
    () =>
      new ExperimentsApi().addExperiment({
        experimentValues: {
          name: store.getState().ExperimentDialogStore.experimentName,
          description: store.getState().ExperimentDialogStore
            .experimentDescription,
          softKPIs: {
            timeToConfigure: store.getState().ExperimentDialogStore
              .timeToConfigure,
          },
          datasetId:
            store.getState().BenchmarkConfigurationStore.selectedDataset?.id ??
            MagicNotPossibleId,
          algorithmId: getAlgorithmIdFromName(
            store.getState().ExperimentDialogStore.selectedTags[0] ?? [],
            store.getState().CoreStore.algorithms
          ),
        },
      }),
    dispatch,
    showSuccess ? SUCCESS_TO_ADD_NEW_EXPERIMENT : undefined
  );

const uploadExperimentFile = (
  id?: number,
  showSuccess = true
): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> => {
  const willUpload =
    store.getState().ExperimentDialogStore.selectedFiles.length > 0;
  if (willUpload) {
    return RequestHandler(
      () =>
        new ExperimentsApi().setExperimentFile({
          experimentId:
            id ??
            store.getState().ExperimentDialogStore.experimentId ??
            MagicNotPossibleId,
          format: store.getState().ExperimentDialogStore.experimentFileFormat,
          body: store.getState().ExperimentDialogStore.selectedFiles[0] as Blob,
        }),
      dispatch,
      showSuccess && willUpload ? SUCCESS_TO_UPLOAD_EXPERIMENT_FILE : undefined,
      true
    );
  }
  return Promise.resolve();
};

const editExistingExperiment = (): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> => {
  return RequestHandler<void>(
    (): Promise<void> =>
      new ExperimentsApi().setExperiment({
        experimentId:
          store.getState().ExperimentDialogStore.experimentId ??
          MagicNotPossibleId,
        experimentValues: {
          name: store.getState().ExperimentDialogStore.experimentName,
          description: store.getState().ExperimentDialogStore
            .experimentDescription,
          softKPIs: {
            timeToConfigure: store.getState().ExperimentDialogStore
              .timeToConfigure,
          },
          datasetId:
            store.getState().BenchmarkConfigurationStore.selectedDataset?.id ??
            MagicNotPossibleId,
          algorithmId: getAlgorithmIdFromName(
            store.getState().ExperimentDialogStore.selectedTags[0] ?? 'Unknown',
            store.getState().CoreStore.algorithms
          ),
        },
      }),
    dispatch,
    SUCCESS_TO_UPDATE_EXPERIMENT
  ).then((): Promise<void> => dispatch(getExperiments()));
};

const addNewExperiment = (): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> => {
  dispatch(createNewExperiment(false))
    .then((id) =>
      dispatch(uploadExperimentFile(id, false)).catch((error) =>
        RequestHandler(
          () =>
            new ExperimentsApi().deleteExperiment({
              experimentId: id,
            }),
          dispatch
        ).finally(() => Promise.reject(error))
      )
    )
    .then(() => dispatch(resetDialog()))
    .then(() =>
      dispatch(showToast(SUCCESS_TO_ADD_NEW_EXPERIMENT, ToastType.Success))
    )
    .finally(() => {
      dispatch(getExperiments());
      dispatch(closeDialog());
    });
};

const updateExistingExperiment = (): SnowmanThunkAction<
  Promise<void>
> => async (dispatch: SnowmanDispatch): Promise<void> => {
  dispatch(editExistingExperiment())
    .then((): Promise<void> => dispatch(uploadExperimentFile()))
    .then((): void => dispatch(resetDialog()))
    .finally((): void => {
      dispatch(getExperiments());
      dispatch(closeDialog());
    });
};

export const addOrUpdateExperiment = (): SnowmanThunkAction<
  Promise<void>
> => async (dispatch: SnowmanDispatch): Promise<void> => {
  if (store.getState().ExperimentDialogStore.experimentId === null) {
    return dispatch(addNewExperiment());
  }
  return dispatch(updateExistingExperiment());
};

import 'types/ExperimentFileFormats';

import { ExperimentsApi } from 'api';
import { AddExperimentDialogStoreActionTypes as actionTypes } from 'store/actions/actionTypes';
import { getExperiments } from 'store/actions/ExperimentsStoreActions';
import { SnowmanDispatch, SnowmanThunkAction } from 'store/messages';
import { store } from 'store/store';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';
import { getAlgorithmIdFromTag } from 'utils/algorithmHelpers';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';
import RequestHandler from 'utils/requestHandler';
import {
  SUCCESS_TO_ADD_NEW_EXPERIMENT,
  SUCCESS_TO_UPLOAD_EXPERIMENT_FILE,
} from 'utils/statusMessages';

export const openDialog = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.OPEN_DIALOG,
    // reducer ignores payload
    payload: false,
  });

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

const createNewExperiment = (): SnowmanThunkAction<Promise<number>> => async (
  dispatch: SnowmanDispatch
): Promise<number> =>
  RequestHandler<number>(
    () =>
      new ExperimentsApi().addExperiment({
        experimentValues: {
          name: store.getState().AddExperimentDialogStore.experimentName,
          description: store.getState().AddExperimentDialogStore
            .experimentDescription,
          datasetId: store.getState().DatasetsStore.selectedDataset?.id ?? -1,
          algorithmId: getAlgorithmIdFromTag(
            store.getState().AddExperimentDialogStore.selectedTags[0] ?? [],
            store.getState().AlgorithmsStore.algorithms
          ),
        },
      }),
    dispatch,
    SUCCESS_TO_ADD_NEW_EXPERIMENT
  );

export const uploadExperimentFile = (
  id: number
): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> =>
  RequestHandler(
    () =>
      new ExperimentsApi().setExperimentFile({
        experimentId: id,
        format: store.getState().AddExperimentDialogStore.experimentFileFormat,
        body: store.getState().AddExperimentDialogStore
          .selectedFiles[0] as Blob,
      }),
    dispatch,
    SUCCESS_TO_UPLOAD_EXPERIMENT_FILE,
    true
  );

export const addNewExperiment = (): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> => {
  dispatch(createNewExperiment())
    .then((id: number): Promise<void> => dispatch(uploadExperimentFile(id)))
    .then((): Promise<void> => dispatch(getExperiments()))
    .then((): void => dispatch(resetDialog()))
    .finally((): void => dispatch(closeDialog()));
};

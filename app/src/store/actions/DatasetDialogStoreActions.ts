import { DatasetsApi } from 'api';
import { DatasetDialogStoreActionTypes as DialogActionTypes } from 'store/actions/actionTypes';
import { getDatasets } from 'store/actions/DatasetsStoreActions';
import { SnowmanDispatch, SnowmanThunkAction } from 'store/messages';
import { store } from 'store/store';
import { DatasetTypes } from 'types/DatasetTypes';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';
import RequestHandler from 'utils/requestHandler';
import {
  SUCCESS_TO_CREATE_NEW_DATASET,
  SUCCESS_TO_UPLOAD_DATASET_FILE,
} from 'utils/statusMessages';
import { getTagsFromDatasets } from 'utils/tagFactory';

export const openDialog = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActionTypes.OPEN_DIALOG,
    payload: getTagsFromDatasets(store.getState().DatasetsStore.datasets),
  });

export const closeDialog = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActionTypes.CLOSE_DIALOG,
    // reducer ignores payload
    payload: false,
  });

export const changeDatasetName = (
  aDatasetName: string
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActionTypes.CHANGE_DATASET_NAME,
    payload: aDatasetName,
  });

export const changeDatasetDescription = (
  aDescription: string
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActionTypes.CHANGE_DATASET_DESCRIPTION,
    payload: aDescription,
  });

export const changeDatasetType = (
  aType: DatasetTypes
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActionTypes.CHANGE_DATASET_TYPE,
    payload: aType,
  });

export const changeDatasetLength = (
  aLength: number
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActionTypes.CHANGE_DATASET_LENGTH,
    payload: aLength,
  });

export const changeDatasetCSVIdColumn = (
  anIdColumn: string
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActionTypes.CHANGE_CSV_ID_COLUMN,
    payload: anIdColumn,
  });

export const changeDatasetCSVSeparator = (
  aSeparator: string
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActionTypes.CHANGE_CSV_SEPARATOR,
    payload: aSeparator,
  });

export const changeDatasetCSVQuote = (
  aQuote: string
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActionTypes.CHANGE_CSV_QUOTE,
    payload: aQuote,
  });

export const changeDatasetCSVEscape = (
  anEscape: string
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActionTypes.CHANGE_CSV_ESCAPE,
    payload: anEscape,
  });

export const addNewTag = (aTag: string): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActionTypes.ADD_DATASET_TAG,
    payload: aTag,
  });

export const resetDialog = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActionTypes.RESET_DIALOG,
    // payload is not used
    payload: false,
  });

export const setSelectedFiles = (files: File[]): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActionTypes.CHANGE_DATASET_FILES,
    payload: files,
  });

export const clickOnDatasetTag = (aTag: string): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActionTypes.CLICK_ON_DATASET_TAG,
    payload: aTag,
  });

export const createNewDataset = (
  name: string,
  description: string,
  numberOfRecords = 0,
  tags: string[]
): SnowmanThunkAction<Promise<number>> => async (
  dispatch: SnowmanDispatch
): Promise<number> =>
  RequestHandler<number>(
    (): Promise<number> =>
      new DatasetsApi().addDataset({
        datasetValues: {
          name: name,
          description: description,
          numberOfRecords: numberOfRecords,
          tags: tags,
        },
      }),
    dispatch,
    SUCCESS_TO_CREATE_NEW_DATASET
  );

export const uploadDatasetFile = (
  id: number,
  idColumn: string,
  separator: string,
  quote: string,
  escape: string,
  file: File
): SnowmanThunkAction<Promise<void>> => async (dispatch: SnowmanDispatch) =>
  RequestHandler(
    (): Promise<void> =>
      new DatasetsApi().setDatasetFile({
        datasetId: id,
        idColumn: idColumn,
        quote: quote,
        escape: escape,
        separator: separator,
        body: file as Blob,
      }),
    dispatch,
    SUCCESS_TO_UPLOAD_DATASET_FILE,
    true
  );

export const addNewDataset = (): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> => {
  return dispatch(
    createNewDataset(
      store.getState().DatasetDialogStore.datasetName,
      store.getState().DatasetDialogStore.datasetDescription,
      store.getState().DatasetDialogStore.datasetType === DatasetTypes.skeleton
        ? store.getState().DatasetDialogStore.datasetLength
        : undefined,
      store.getState().DatasetDialogStore.selectedTags
    )
  )
    .then((id: number): void => {
      if (
        store.getState().DatasetDialogStore.datasetType === DatasetTypes.full
      ) {
        dispatch(
          uploadDatasetFile(
            id,
            store.getState().DatasetDialogStore.csvIdColumn,
            store.getState().DatasetDialogStore.csvSeparator,
            store.getState().DatasetDialogStore.csvQuote,
            store.getState().DatasetDialogStore.csvEscape,
            store.getState().DatasetDialogStore.selectedFiles[0]
          )
        );
      }
    })
    .then((): void => dispatch(resetDialog()))
    .finally((): void => {
      dispatch(getDatasets());
      dispatch(closeDialog());
    });
};

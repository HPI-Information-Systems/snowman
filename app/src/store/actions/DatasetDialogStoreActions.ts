import { Dataset, DatasetsApi } from 'api';
import { DatasetDialogStoreActionTypes as DialogActionsTypes } from 'store/actions/actionTypes';
import { getDatasets } from 'store/actions/DatasetsStoreActions';
import { SnowmanDispatch, SnowmanThunkAction } from 'store/messages';
import { store } from 'store/store';
import { DatasetTypes } from 'types/DatasetTypes';
import { MagicNotPossibleId } from 'utils/constants';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';
import RequestHandler from 'utils/requestHandler';
import {
  SUCCESS_TO_CREATE_NEW_DATASET,
  SUCCESS_TO_UPLOAD_DATASET_FILE,
  SUCCESS_UPDATE_DATASET,
} from 'utils/statusMessages';
import { getTagsFromDatasets } from 'utils/tagFactory';

const loadAvailableTags = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActionsTypes.LOAD_AVAILABLE_TAGS,
    payload: getTagsFromDatasets(store.getState().DatasetsStore.datasets),
  });

export const openAddDialog = (): SnowmanThunkAction<void> => (
  dispatch: SnowmanDispatch
): void => {
  dispatch({
    type: DialogActionsTypes.OPEN_ADD_DIALOG,
    // reducer ignores payload
    payload: false,
  });
  dispatch(loadAvailableTags());
};

export const openChangeDialog = (
  datasetId: number
): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> => {
  return RequestHandler(
    (): Promise<void> =>
      new DatasetsApi()
        .getDataset({ datasetId: datasetId })
        .then((aDataset: Dataset) =>
          dispatch({
            type: DialogActionsTypes.OPEN_CHANGE_DIALOG,
            payload: aDataset,
          })
        )
        .then((): void => dispatch(loadAvailableTags())),
    dispatch
  );
};

export const closeDialog = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActionsTypes.CLOSE_DIALOG,
    // reducer ignores payload
    payload: false,
  });

export const changeDatasetName = (
  aDatasetName: string
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActionsTypes.CHANGE_DATASET_NAME,
    payload: aDatasetName,
  });

export const changeDatasetDescription = (
  aDescription: string
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActionsTypes.CHANGE_DATASET_DESCRIPTION,
    payload: aDescription,
  });

export const changeDatasetType = (
  aType: DatasetTypes
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActionsTypes.CHANGE_DATASET_TYPE,
    payload: aType,
  });

export const changeDatasetLength = (
  aLength: number
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActionsTypes.CHANGE_DATASET_LENGTH,
    payload: aLength,
  });

export const changeDatasetCSVIdColumn = (
  anIdColumn: string
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActionsTypes.CHANGE_CSV_ID_COLUMN,
    payload: anIdColumn,
  });

export const changeDatasetCSVSeparator = (
  aSeparator: string
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActionsTypes.CHANGE_CSV_SEPARATOR,
    payload: aSeparator,
  });

export const changeDatasetCSVQuote = (
  aQuote: string
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActionsTypes.CHANGE_CSV_QUOTE,
    payload: aQuote,
  });

export const changeDatasetCSVEscape = (
  anEscape: string
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActionsTypes.CHANGE_CSV_ESCAPE,
    payload: anEscape,
  });

export const addNewTag = (aTag: string): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActionsTypes.ADD_DATASET_TAG,
    payload: aTag,
  });

export const resetDialog = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActionsTypes.RESET_DIALOG,
    // payload is not used
    payload: false,
  });

export const setSelectedFiles = (files: File[]): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActionsTypes.CHANGE_DATASET_FILES,
    payload: files,
  });

export const clickOnDatasetTag = (aTag: string): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActionsTypes.CLICK_ON_DATASET_TAG,
    payload: aTag,
  });

const createNewDataset = (): SnowmanThunkAction<Promise<number>> => async (
  dispatch: SnowmanDispatch
): Promise<number> =>
  RequestHandler<number>(
    (): Promise<number> =>
      new DatasetsApi().addDataset({
        datasetValues: {
          name: store.getState().DatasetDialogStore.datasetName,
          description: store.getState().DatasetDialogStore.datasetDescription,
          numberOfRecords:
            store.getState().DatasetDialogStore.datasetType ===
            DatasetTypes.skeleton
              ? store.getState().DatasetDialogStore.datasetLength
              : undefined,
          tags: store.getState().DatasetDialogStore.selectedTags,
        },
      }),
    dispatch,
    SUCCESS_TO_CREATE_NEW_DATASET
  );

const setExistingDataset = (): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> =>
  RequestHandler<void>(
    (): Promise<void> =>
      new DatasetsApi().setDataset({
        datasetId:
          store.getState().DatasetDialogStore.datasetId ?? MagicNotPossibleId,
        datasetValues: {
          name: store.getState().DatasetDialogStore.datasetName,
          description: store.getState().DatasetDialogStore.datasetDescription,
          tags: store.getState().DatasetDialogStore.selectedTags,
          numberOfRecords: store.getState().DatasetDialogStore.datasetLength,
        },
      }),
    dispatch,
    SUCCESS_UPDATE_DATASET
  );

const uploadDatasetFile = (
  id?: number
): SnowmanThunkAction<Promise<void>> => async (dispatch: SnowmanDispatch) => {
  const willUpload =
    store.getState().DatasetDialogStore.selectedFiles.length > 0;
  return RequestHandler(
    (): Promise<void> => {
      if (
        store.getState().DatasetDialogStore.datasetType === DatasetTypes.full &&
        willUpload
      )
        return new DatasetsApi().setDatasetFile({
          datasetId:
            id ??
            store.getState().DatasetDialogStore.datasetId ??
            MagicNotPossibleId,
          idColumn: store.getState().DatasetDialogStore.csvIdColumn,
          quote: store.getState().DatasetDialogStore.csvQuote,
          escape: store.getState().DatasetDialogStore.csvEscape,
          separator: store.getState().DatasetDialogStore.csvSeparator,
          body: store.getState().DatasetDialogStore.selectedFiles[0] as Blob,
        });
      return Promise.resolve();
    },
    dispatch,
    willUpload ? SUCCESS_TO_UPLOAD_DATASET_FILE : undefined,
    true
  );
};

const addNewDataset = (): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> => {
  return dispatch(createNewDataset())
    .then((id: number): Promise<void> => dispatch(uploadDatasetFile(id)))
    .then((): void => dispatch(resetDialog()))
    .finally((): void => {
      dispatch(getDatasets());
      dispatch(closeDialog());
    });
};

const updatedExistingDataset = (): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> => {
  return dispatch(setExistingDataset())
    .then((): Promise<void> => dispatch(uploadDatasetFile()))
    .then((): void => dispatch(resetDialog()))
    .finally((): void => {
      dispatch(getDatasets());
      dispatch(closeDialog());
    });
};

export const addOrUpdateDataset = (): SnowmanThunkAction<
  Promise<void>
> => async (dispatch: SnowmanDispatch): Promise<void> => {
  if (store.getState().DatasetDialogStore.datasetId === null) {
    return dispatch(addNewDataset());
  }
  return dispatch(updatedExistingDataset());
};

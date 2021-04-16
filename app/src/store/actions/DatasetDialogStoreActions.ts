import { Dataset, DatasetsApi } from 'api';
import { DatasetDialogStoreActionTypes as DialogActionsTypes } from 'store/actions/actionTypes';
import { getDatasets } from 'store/actions/DatasetsPageActions';
import { showToast } from 'store/actions/GlobalIndicatorActions';
import { SnowmanDispatch, SnowmanThunkAction } from 'store/messages';
import { store } from 'store/store';
import { MagicNotPossibleId } from 'structs/constants';
import {
  SUCCESS_TO_CREATE_NEW_DATASET,
  SUCCESS_TO_UPDATE_DATASET,
  SUCCESS_TO_UPLOAD_DATASET_FILE,
} from 'structs/statusMessages';
import { DatasetTypes } from 'types/DatasetTypes';
import { ToastType } from 'types/ToastTypes';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';
import RequestHandler from 'utils/requestHandler';
import { getTagsFromDatasets } from 'utils/tagFactory';

const loadAvailableTags = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DialogActionsTypes.LOAD_AVAILABLE_TAGS,
    payload: getTagsFromDatasets(store.getState().CoreStore.datasets),
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
  aDataset: Dataset
): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> => {
  return RequestHandler(
    (): Promise<void> =>
      new DatasetsApi()
        .getDataset({ datasetId: aDataset.id })
        .then((aDataset: Dataset): void => {
          dispatch({
            type: DialogActionsTypes.OPEN_CHANGE_DIALOG,
            payload: aDataset,
          });
        })
        .then((): void => dispatch(loadAvailableTags()))
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

const createNewDataset = (
  showSuccess = true
): SnowmanThunkAction<Promise<number>> => async (): Promise<number> =>
  RequestHandler<number>(
    (): Promise<number> =>
      new DatasetsApi().addDataset({
        dataset: {
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
    showSuccess ? SUCCESS_TO_CREATE_NEW_DATASET : undefined
  );

const setExistingDataset = (): SnowmanThunkAction<
  Promise<void>
> => async (): Promise<void> =>
  RequestHandler<void>(
    (): Promise<void> =>
      new DatasetsApi().setDataset({
        datasetId:
          store.getState().DatasetDialogStore.datasetId ?? MagicNotPossibleId,
        dataset: {
          name: store.getState().DatasetDialogStore.datasetName,
          description: store.getState().DatasetDialogStore.datasetDescription,
          tags: store.getState().DatasetDialogStore.selectedTags,
          numberOfRecords: store.getState().DatasetDialogStore.datasetLength,
        },
      }),
    SUCCESS_TO_UPDATE_DATASET
  );

const uploadDatasetFile = (
  id?: number,
  showSuccess = false
): SnowmanThunkAction<Promise<void>> => async () => {
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
          file: store.getState().DatasetDialogStore.selectedFiles[0] as Blob,
        });
      return Promise.resolve();
    },
    showSuccess && willUpload ? SUCCESS_TO_UPLOAD_DATASET_FILE : undefined,
    true
  );
};

const addNewDataset = (): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> => {
  return dispatch(createNewDataset(false))
    .then((id) =>
      dispatch(uploadDatasetFile(id)).catch((error) =>
        RequestHandler(() =>
          new DatasetsApi().deleteDataset({ datasetId: id })
        ).finally(() => Promise.reject(error))
      )
    )
    .then(() => dispatch(resetDialog()))
    .then(() =>
      dispatch(showToast(SUCCESS_TO_CREATE_NEW_DATASET, ToastType.Success))
    )
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

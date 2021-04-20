import { DatasetValues, SetDatasetFileRequest } from 'api';
import { DatasetDialogActionTypes } from 'apps/DatasetDialog/types/DatasetDialogActionTypes';
import { DatasetDialogModel } from 'apps/DatasetDialog/types/DatasetDialogModel';
import { DatasetTypes } from 'types/DatasetTypes';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

export const changeDatasetName = (
  aDatasetName: string
): easyPrimitiveActionReturn<DatasetDialogModel> =>
  easyPrimitiveAction<DatasetDialogModel>({
    type: DatasetDialogActionTypes.CHANGE_DATASET_NAME,
    payload: aDatasetName,
  });

export const changeDatasetDescription = (
  aDescription: string
): easyPrimitiveActionReturn<DatasetDialogModel> =>
  easyPrimitiveAction<DatasetDialogModel>({
    type: DatasetDialogActionTypes.CHANGE_DATASET_DESCRIPTION,
    payload: aDescription,
  });

export const changeDatasetType = (
  aType: DatasetTypes
): easyPrimitiveActionReturn<DatasetDialogModel> =>
  easyPrimitiveAction<DatasetDialogModel>({
    type: DatasetDialogActionTypes.CHANGE_DATASET_TYPE,
    payload: aType,
  });

export const changeDatasetLength = (
  aLength: number
): easyPrimitiveActionReturn<DatasetDialogModel> =>
  easyPrimitiveAction<DatasetDialogModel>({
    type: DatasetDialogActionTypes.CHANGE_DATASET_LENGTH,
    payload: aLength,
  });

export const changeDatasetCSVIdColumn = (
  anIdColumn: string
): easyPrimitiveActionReturn<DatasetDialogModel> =>
  easyPrimitiveAction<DatasetDialogModel>({
    type: DatasetDialogActionTypes.CHANGE_CSV_ID_COLUMN,
    payload: anIdColumn,
  });

export const changeDatasetCSVSeparator = (
  aSeparator: string
): easyPrimitiveActionReturn<DatasetDialogModel> =>
  easyPrimitiveAction<DatasetDialogModel>({
    type: DatasetDialogActionTypes.CHANGE_CSV_SEPARATOR,
    payload: aSeparator,
  });

export const changeDatasetCSVQuote = (
  aQuote: string
): easyPrimitiveActionReturn<DatasetDialogModel> =>
  easyPrimitiveAction<DatasetDialogModel>({
    type: DatasetDialogActionTypes.CHANGE_CSV_QUOTE,
    payload: aQuote,
  });

export const changeDatasetCSVEscape = (
  anEscape: string
): easyPrimitiveActionReturn<DatasetDialogModel> =>
  easyPrimitiveAction<DatasetDialogModel>({
    type: DatasetDialogActionTypes.CHANGE_CSV_ESCAPE,
    payload: anEscape,
  });

export const addNewTag = (
  aTag: string
): easyPrimitiveActionReturn<DatasetDialogModel> =>
  easyPrimitiveAction<DatasetDialogModel>({
    type: DatasetDialogActionTypes.ADD_DATASET_TAG,
    payload: aTag,
  });

export const resetDialog = (): easyPrimitiveActionReturn<DatasetDialogModel> =>
  easyPrimitiveAction<DatasetDialogModel>({
    type: DatasetDialogActionTypes.RESET_DIALOG,
    // payload is not used
    payload: false,
  });

export const setSelectedFiles = (
  files: File[]
): easyPrimitiveActionReturn<DatasetDialogModel> =>
  easyPrimitiveAction<DatasetDialogModel>({
    type: DatasetDialogActionTypes.CHANGE_DATASET_FILES,
    payload: files,
  });

export const clickOnDatasetTag = (
  aTag: string
): easyPrimitiveActionReturn<DatasetDialogModel> =>
  easyPrimitiveAction<DatasetDialogModel>({
    type: DatasetDialogActionTypes.CLICK_ON_DATASET_TAG,
    payload: aTag,
  });

const getDatasetValues = (state: DatasetDialogModel): DatasetValues => ({
  name: state.datasetName,
  description: state.datasetDescription,
  tags: state.selectedTags,
  numberOfRecords: state.datasetLength,
});

const getDatasetFileValues = (
  state: DatasetDialogModel,
  id: number
): SetDatasetFileRequest => ({
  datasetId: id,
  idColumn: state.csvIdColumn,
  quote: state.csvQuote,
  escape: state.csvEscape,
  separator: state.csvSeparator,
  file: state.selectedFiles[0] as Blob,
});

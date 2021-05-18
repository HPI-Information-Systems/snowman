import {
  Dataset,
  DatasetsApi,
  DatasetValues,
  SetDatasetFileRequest,
} from 'api';
import { DatasetDialogActionTypes } from 'apps/DatasetDialog/types/DatasetDialogActionTypes';
import { DatasetDialogModel } from 'apps/DatasetDialog/types/DatasetDialogModel';
import { doRefreshCentralResources } from 'apps/SnowmanApp/store/CentralResourcesDoActions';
import { doCloseDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { MagicNotPossibleId } from 'structs/constants';
import {
  SUCCESS_TO_CREATE_NEW_DATASET,
  SUCCESS_TO_UPDATE_DATASET,
} from 'structs/statusMessages';
import { DatasetTypes } from 'types/DatasetTypes';
import { EntityId } from 'types/EntityId';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';
import RequestHandler from 'utils/requestHandler';

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

export const changeTags = (
  tags: string[]
): easyPrimitiveActionReturn<DatasetDialogModel> =>
  easyPrimitiveAction<DatasetDialogModel>({
    type: DatasetDialogActionTypes.CHANGE_TAGS,
    payload: tags,
  });

export const prefillDialog = (
  aDataset: Dataset
): easyPrimitiveActionReturn<DatasetDialogModel> =>
  easyPrimitiveAction<DatasetDialogModel>({
    type: DatasetDialogActionTypes.PREFILL_DIALOG,
    payload: aDataset,
  });

export const onDialogClose = (
  dispatch: SnowmanDispatch<DatasetDialogModel>,
  entityId: EntityId,
  _: unknown
): void => {
  if (entityId !== null) {
    dispatch(resetDialog());
  }
};

export const prepareUpdateDialog = (
  entityId: EntityId
): SnowmanThunkAction<Promise<void>, DatasetDialogModel> => (
  dispatch: SnowmanDispatch<DatasetDialogModel>
): Promise<void> =>
  RequestHandler<void>(
    (): Promise<void> =>
      new DatasetsApi()
        .getDataset({
          datasetId: entityId ?? MagicNotPossibleId,
        })
        .then((theDataset: Dataset): void => {
          dispatch(prefillDialog(theDataset));
        }),
    undefined,
    true
  );

export const onDialogOpen = (
  dispatch: SnowmanDispatch<DatasetDialogModel>,
  entityId: EntityId,
  _: unknown
): void => {
  if (entityId !== null) {
    dispatch(prepareUpdateDialog(entityId)).then();
  }
};

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

const createDataset = (): SnowmanThunkAction<
  Promise<number>,
  DatasetDialogModel
> => async (_: unknown, getState: () => DatasetDialogModel): Promise<number> =>
  new DatasetsApi().addDataset({ dataset: getDatasetValues(getState()) });

const setDataset = (
  id: number
): SnowmanThunkAction<Promise<void>, DatasetDialogModel> => async (
  _: unknown,
  getState: () => DatasetDialogModel
): Promise<void> =>
  new DatasetsApi().setDataset({
    datasetId: id,
    dataset: getDatasetValues(getState()),
  });

const uploadDatasetFile = (
  id: number
): SnowmanThunkAction<Promise<void>, DatasetDialogModel> => async (
  _: unknown,
  getState: () => DatasetDialogModel
): Promise<void> =>
  new DatasetsApi().setDatasetFile(getDatasetFileValues(getState(), id));

const addDataset = (): SnowmanThunkAction<
  Promise<void>,
  DatasetDialogModel
> => async (
  dispatch: SnowmanDispatch<DatasetDialogModel>,
  getState: () => DatasetDialogModel
): Promise<void> =>
  RequestHandler(
    () =>
      dispatch(createDataset()).then((id) => {
        return getState().datasetType === DatasetTypes.full
          ? dispatch(uploadDatasetFile(id)).catch((error) =>
              RequestHandler(() =>
                new DatasetsApi().deleteDataset({ datasetId: id })
              ).finally(() => Promise.reject(error))
            )
          : Promise.resolve();
      }),
    SUCCESS_TO_CREATE_NEW_DATASET,
    true
  )
    .then(() => {
      dispatch(resetDialog());
      doCloseDialog();
    })
    .finally((): void => {
      doRefreshCentralResources();
    });

const updateDataset = (
  id: number
): SnowmanThunkAction<Promise<void>, DatasetDialogModel> => async (
  dispatch: SnowmanDispatch<DatasetDialogModel>,
  getState: () => DatasetDialogModel
): Promise<void> => {
  return RequestHandler(
    () =>
      dispatch(setDataset(id)).then(
        (): Promise<void> => {
          doCloseDialog();
          return getState().selectedFiles.length > 0
            ? dispatch(uploadDatasetFile(id))
            : Promise.resolve();
        }
      ),
    SUCCESS_TO_UPDATE_DATASET,
    true
  )
    .then(() => {
      dispatch(resetDialog());
      doCloseDialog();
    })
    .finally(() => {
      doRefreshCentralResources();
    });
};

export const addOrUpdateDataset = (
  datasetId: EntityId
): SnowmanThunkAction<Promise<void>, DatasetDialogModel> => async (
  dispatch: SnowmanDispatch<DatasetDialogModel>
): Promise<void> => {
  if (datasetId === null) {
    return dispatch(addDataset());
  }
  return dispatch(updateDataset(datasetId));
};

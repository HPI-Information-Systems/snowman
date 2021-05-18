import {
  Experiment,
  ExperimentsApi,
  ExperimentValues,
  SetExperimentFileRequest,
} from 'api';
import { ExperimentDialogActionTypes } from 'apps/ExperimentDialog/types/ExperimentDialogActionTypes';
import { ExperimentDialogModel } from 'apps/ExperimentDialog/types/ExperimentDialogModel';
import { ExperimentSegmentTypeEnum } from 'apps/ExperimentDialog/types/ExperimentSegmentTypeEnum';
import { doRefreshCentralResources } from 'apps/SnowmanApp/store/CentralResourcesDoActions';
import { doCloseDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { MagicNotPossibleId } from 'structs/constants';
import {
  SUCCESS_TO_CREATE_NEW_EXPERIMENT,
  SUCCESS_TO_UPDATE_EXPERIMENT,
} from 'structs/statusMessages';
import { EntityId } from 'types/EntityId';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';
import { removeNaN } from 'utils/removeNaN';
import RequestHandler from 'utils/requestHandler';

export const resetDialog = (): easyPrimitiveActionReturn<ExperimentDialogModel> =>
  easyPrimitiveAction<ExperimentDialogModel>({
    type: ExperimentDialogActionTypes.RESET_DIALOG,
    // payload is not used
    payload: false,
  });

export const toggleSegmentExpansion = (
  aSegment: ExperimentSegmentTypeEnum
): easyPrimitiveActionReturn<ExperimentDialogModel> =>
  easyPrimitiveAction<ExperimentDialogModel>({
    type: ExperimentDialogActionTypes.TOGGLE_SEGMENT_EXPANSION,
    payload: aSegment,
  });

export const changeExperimentName = (
  aName: string
): easyPrimitiveActionReturn<ExperimentDialogModel> =>
  easyPrimitiveAction<ExperimentDialogModel>({
    type: ExperimentDialogActionTypes.CHANGE_EXPERIMENT_NAME,
    payload: aName,
  });

export const changeExperimentDescription = (
  aDescription: string
): easyPrimitiveActionReturn<ExperimentDialogModel> =>
  easyPrimitiveAction<ExperimentDialogModel>({
    type: ExperimentDialogActionTypes.CHANGE_EXPERIMENT_DESCRIPTION,
    payload: aDescription,
  });

export const changeFileFormat = (
  aFormat: experimentFileFormatEnum
): easyPrimitiveActionReturn<ExperimentDialogModel> =>
  easyPrimitiveAction<ExperimentDialogModel>({
    type: ExperimentDialogActionTypes.CHANGE_EXPERIMENT_FORMAT,
    payload: aFormat,
  });

export const changeDataset = (
  aDatasetId: number | undefined
): easyPrimitiveActionReturn<ExperimentDialogModel> =>
  easyPrimitiveAction<ExperimentDialogModel>({
    type: ExperimentDialogActionTypes.CHANGE_DATASET,
    payload: aDatasetId,
  });

export const changeRuntime = (
  aRuntime: number | undefined
): easyPrimitiveActionReturn<ExperimentDialogModel> =>
  easyPrimitiveAction<ExperimentDialogModel>({
    type: ExperimentDialogActionTypes.CHANGE_RUNTIME,
    payload: aRuntime,
  });

export const changeAlgorithm = (
  aDatasetId: number | undefined
): easyPrimitiveActionReturn<ExperimentDialogModel> =>
  easyPrimitiveAction<ExperimentDialogModel>({
    type: ExperimentDialogActionTypes.CHANGE_ALGORITHM,
    payload: aDatasetId,
  });

export const changeSelectedFiles = (
  files: File[]
): easyPrimitiveActionReturn<ExperimentDialogModel> =>
  easyPrimitiveAction<ExperimentDialogModel>({
    type: ExperimentDialogActionTypes.CHANGE_SELECTED_FILES,
    payload: files,
  });

export const changeHRAmount = (
  anHRAmount: number
): easyPrimitiveActionReturn<ExperimentDialogModel> =>
  easyPrimitiveAction<ExperimentDialogModel>({
    type: ExperimentDialogActionTypes.CHANGE_HR_AMOUNT,
    payload: anHRAmount,
  });

export const changeExpertise = (
  anExpertise: number
): easyPrimitiveActionReturn<ExperimentDialogModel> =>
  easyPrimitiveAction<ExperimentDialogModel>({
    type: ExperimentDialogActionTypes.CHANGE_EXPERTISE,
    payload: anExpertise,
  });

export const prefillDialog = (
  anExperiment: Experiment
): easyPrimitiveActionReturn<ExperimentDialogModel> =>
  easyPrimitiveAction<ExperimentDialogModel>({
    type: ExperimentDialogActionTypes.PREFILL_DIALOG,
    payload: anExperiment,
  });

export const onDialogClose = (
  dispatch: SnowmanDispatch<ExperimentDialogModel>,
  entityId: EntityId,
  _: unknown
): void => {
  if (entityId !== null) {
    dispatch(resetDialog());
  }
};

export const prepareUpdateDialog = (
  entityId: EntityId
): SnowmanThunkAction<Promise<void>, ExperimentDialogModel> => (
  dispatch: SnowmanDispatch<ExperimentDialogModel>
): Promise<void> =>
  RequestHandler<void>(
    (): Promise<void> =>
      new ExperimentsApi()
        .getExperiment({
          experimentId: entityId ?? MagicNotPossibleId,
        })
        .then((theExperiment: Experiment): void => {
          dispatch(prefillDialog(theExperiment));
        }),
    undefined,
    true
  );

export const onDialogOpen = (
  dispatch: SnowmanDispatch<ExperimentDialogModel>,
  entityId: EntityId,
  _: unknown
): void => {
  if (entityId !== null) {
    dispatch(prepareUpdateDialog(entityId)).then();
  }
};

const getExperimentValues = (
  state: ExperimentDialogModel
): ExperimentValues => ({
  datasetId: state.selectedDataset ?? MagicNotPossibleId,
  algorithmId: state.selectedAlgorithm ?? MagicNotPossibleId,
  name: state.experimentName,
  description: state.experimentDescription,
  softKPIs: {
    effort: {
      expertise: removeNaN(state.expertise),
      hrAmount: removeNaN(state.hrAmount),
    },
    runtime: removeNaN(state.runtime),
  },
});

const getExperimentFileValues = (
  state: ExperimentDialogModel,
  id: number
): SetExperimentFileRequest => ({
  experimentId: id,
  file: state.selectedFiles[0] as Blob,
  format: state.experimentFileFormat,
});

const createExperiment = (): SnowmanThunkAction<
  Promise<number>,
  ExperimentDialogModel
> => async (
  _: unknown,
  getState: () => ExperimentDialogModel
): Promise<number> =>
  new ExperimentsApi().addExperiment({
    experiment: getExperimentValues(getState()),
  });

const setExperiment = (
  id: number
): SnowmanThunkAction<Promise<void>, ExperimentDialogModel> => async (
  _: unknown,
  getState: () => ExperimentDialogModel
): Promise<void> =>
  new ExperimentsApi().setExperiment({
    experimentId: id,
    experiment: getExperimentValues(getState()),
  });

const uploadExperimentFile = (
  id: number
): SnowmanThunkAction<Promise<void>, ExperimentDialogModel> => async (
  _: unknown,
  getState: () => ExperimentDialogModel
): Promise<void> =>
  new ExperimentsApi().setExperimentFile(
    getExperimentFileValues(getState(), id)
  );

const addExperiment = (): SnowmanThunkAction<
  Promise<void>,
  ExperimentDialogModel
> => async (
  dispatch: SnowmanDispatch<ExperimentDialogModel>
): Promise<void> => {
  return RequestHandler(
    () =>
      dispatch(createExperiment()).then((id) =>
        dispatch(uploadExperimentFile(id)).catch((error) =>
          new ExperimentsApi()
            .deleteExperiment({ experimentId: id })
            .finally(() => Promise.reject(error))
        )
      ),
    SUCCESS_TO_CREATE_NEW_EXPERIMENT,
    true
  )
    .then(() => {
      dispatch(resetDialog());
      doCloseDialog();
    })
    .finally((): void => {
      doRefreshCentralResources();
    });
};

const updateExperiment = (
  id: number
): SnowmanThunkAction<Promise<void>, ExperimentDialogModel> => async (
  dispatch: SnowmanDispatch<ExperimentDialogModel>
): Promise<void> => {
  return RequestHandler(
    () => dispatch(setExperiment(id)),
    SUCCESS_TO_UPDATE_EXPERIMENT,
    true
  )
    .then(() => {
      dispatch(resetDialog());
      doCloseDialog();
    })
    .finally((): void => {
      doRefreshCentralResources();
    });
};

export const addOrUpdateExperiment = (
  experimentId: EntityId
): SnowmanThunkAction<Promise<void>, ExperimentDialogModel> => async (
  dispatch: SnowmanDispatch<ExperimentDialogModel>
): Promise<void> => {
  if (experimentId === null) {
    return dispatch(addExperiment());
  }
  return dispatch(updateExperiment(experimentId));
};

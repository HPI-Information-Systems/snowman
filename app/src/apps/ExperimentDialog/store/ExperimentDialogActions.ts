import { Experiment, ExperimentsApi } from 'api';
import { ExperimentDialogActionTypes } from 'apps/ExperimentDialog/types/ExperimentDialogActionTypes';
import { ExperimentDialogModel } from 'apps/ExperimentDialog/types/ExperimentDialogModel';
import { SnowmanGenericThunkAction } from 'store/messages';
import { MagicNotPossibleId } from 'structs/constants';
import { EntityId } from 'types/EntityId';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';
import RequestHandler from 'utils/requestHandler';

export const resetDialog = (): easyPrimitiveActionReturn<ExperimentDialogModel> =>
  easyPrimitiveAction<ExperimentDialogModel>({
    type: ExperimentDialogActionTypes.RESET_DIALOG,
    // payload is not used
    payload: false,
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
  aDatasetId: string
): easyPrimitiveActionReturn<ExperimentDialogModel> =>
  easyPrimitiveAction<ExperimentDialogModel>({
    type: ExperimentDialogActionTypes.CHANGE_DATASET,
    payload: aDatasetId,
  });

export const changeAlgorithm = (
  aDatasetId: string
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

export const prefillDialog = (
  anExperiment: Experiment
): easyPrimitiveActionReturn<ExperimentDialogModel> =>
  easyPrimitiveAction<ExperimentDialogModel>({
    type: ExperimentDialogActionTypes.PREFILL_DIALOG,
    payload: anExperiment,
  });

export const onDialogClose = (
  dispatch: SnowmanDispatch<ExperimentDialogModel>,
  entityId: EntityId
): void => {
  if (entityId !== null) {
    dispatch(resetDialog());
  }
};

export const prepareUpdateDialog = (
  entityId: EntityId
): SnowmanGenericThunkAction<Promise<void>, ExperimentDialogModel> => (
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
        })
  );

export const onDialogOpen = (
  dispatch: SnowmanDispatch<ExperimentDialogModel>,
  entityId: EntityId
): void => {
  if (entityId !== null) {
    dispatch(prepareUpdateDialog(entityId)).then();
  }
};

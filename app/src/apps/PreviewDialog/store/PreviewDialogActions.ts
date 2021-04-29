import { Dataset, DatasetsApi, Experiment, ExperimentsApi } from 'api';
import { PreviewDialogActionTypes } from 'apps/PreviewDialog/types/PreviewDialogActionTypes';
import { PreviewDialogModel } from 'apps/PreviewDialog/types/PreviewDialogModel';
import { PreviewDialogTypes } from 'apps/PreviewDialog/types/PreviewDialogTypes';
import { SnowmanGenericThunkAction } from 'store/messages';
import { MagicNotPossibleId } from 'structs/constants';
import { EntityId } from 'types/EntityId';
import { EntityType } from 'types/EntityType';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';
import RequestHandler from 'utils/requestHandler';

export const setNone = (): easyPrimitiveActionReturn<PreviewDialogModel> =>
  easyPrimitiveAction<PreviewDialogModel>({
    type: PreviewDialogActionTypes.SET_NONE,
    // payload is not used
    payload: false,
  });

export const setDataset = (
  aDataset: Dataset
): easyPrimitiveActionReturn<PreviewDialogModel> =>
  easyPrimitiveAction<PreviewDialogModel>({
    type: PreviewDialogActionTypes.SET_DATASET,
    payload: aDataset,
  });

export const setExperiment = (
  anExperiment: Experiment
): easyPrimitiveActionReturn<PreviewDialogModel> =>
  easyPrimitiveAction<PreviewDialogModel>({
    type: PreviewDialogActionTypes.SET_EXPERIMENT,
    payload: anExperiment,
  });

export const loadAndStoreDataset = (
  entityId: EntityId
): SnowmanGenericThunkAction<Promise<void>, PreviewDialogModel> => (
  dispatch: SnowmanDispatch<PreviewDialogModel>
): Promise<void> =>
  RequestHandler<void>(
    (): Promise<void> =>
      new DatasetsApi()
        .getDataset({
          datasetId: entityId ?? MagicNotPossibleId,
        })
        .then((theDataset: Dataset): void => {
          dispatch(setDataset(theDataset));
        }),
    undefined,
    true
  );

export const loadAndStoreExperiment = (
  entityId: EntityId
): SnowmanGenericThunkAction<Promise<void>, PreviewDialogModel> => (
  dispatch: SnowmanDispatch<PreviewDialogModel>
): Promise<void> =>
  RequestHandler<void>(
    (): Promise<void> =>
      new ExperimentsApi()
        .getExperiment({
          experimentId: entityId ?? MagicNotPossibleId,
        })
        .then((theExperiment: Experiment): void => {
          dispatch(setExperiment(theExperiment));
        }),
    undefined,
    true
  );

export const onDialogOpen = (
  dispatch: SnowmanDispatch<PreviewDialogModel>,
  entityId: EntityId,
  entityType?: EntityType
): void => {
  console.log(entityId, entityType);
  if (entityType === PreviewDialogTypes.DATASET && entityId !== null) {
    dispatch(loadAndStoreDataset(entityId)).then();
  } else if (
    entityType === PreviewDialogTypes.EXPERIMENT &&
    entityId !== null
  ) {
    dispatch(loadAndStoreExperiment(entityId)).then();
  } else {
    dispatch(setNone());
  }
};

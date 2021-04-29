import { Algorithm, AlgorithmApi, AlgorithmValues } from 'api';
import { AlgorithmDialogActionTypes } from 'apps/AlgorithmDialog/types/AlgorithmDialogActionTypes';
import { AlgorithmDialogModel } from 'apps/AlgorithmDialog/types/AlgorithmDialogModel';
import { doRefreshCentralResources } from 'apps/SnowmanApp/store/CentralResourcesDoActions';
import { doCloseDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { SnowmanGenericThunkAction } from 'store/messages';
import { MagicNotPossibleId } from 'structs/constants';
import {
  SUCCESS_TO_ADD_NEW_ALGORITHM,
  SUCCESS_TO_UPDATE_ALGORITHM,
} from 'structs/statusMessages';
import { EntityId } from 'types/EntityId';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';
import RequestHandler from 'utils/requestHandler';

export const changeAlgorithmName = (
  aName: string
): easyPrimitiveActionReturn<AlgorithmDialogModel> =>
  easyPrimitiveAction<AlgorithmDialogModel>({
    type: AlgorithmDialogActionTypes.CHANGE_ALGORITHM_NAME,
    payload: aName,
  });

export const changeAlgorithmDescription = (
  aDescription: string
): easyPrimitiveActionReturn<AlgorithmDialogModel> =>
  easyPrimitiveAction<AlgorithmDialogModel>({
    type: AlgorithmDialogActionTypes.CHANGE_ALGORITHM_DESCRIPTION,
    payload: aDescription,
  });

const resetDialog = (): easyPrimitiveActionReturn<AlgorithmDialogModel> =>
  easyPrimitiveAction<AlgorithmDialogModel>({
    type: AlgorithmDialogActionTypes.RESET_DIALOG,
    // reducer ignores payload
    payload: false,
  });

export const onDialogClose = (
  dispatch: SnowmanDispatch<AlgorithmDialogModel>,
  entityId: EntityId,
  _: unknown
): void => {
  if (entityId !== null) {
    dispatch(resetDialog());
  }
};

export const prepareUpdateDialog = (
  entityId: EntityId
): SnowmanGenericThunkAction<Promise<void>, AlgorithmDialogModel> => (
  dispatch: SnowmanDispatch<AlgorithmDialogModel>
): Promise<void> =>
  RequestHandler<void>(
    (): Promise<void> =>
      new AlgorithmApi()
        .getAlgorithm({
          algorithmId: entityId ?? MagicNotPossibleId,
        })
        .then((theAlgorithm: Algorithm): void => {
          dispatch(changeAlgorithmName(theAlgorithm.name));
          dispatch(changeAlgorithmDescription(theAlgorithm.description ?? ''));
        }),
    undefined,
    true
  );

export const onDialogOpen = (
  dispatch: SnowmanDispatch<AlgorithmDialogModel>,
  entityId: EntityId,
  _: unknown
): void => {
  if (entityId !== null) {
    dispatch(prepareUpdateDialog(entityId)).then();
  }
};

const getAlgorithmValues = (state: AlgorithmDialogModel): AlgorithmValues => ({
  name: state.algorithmName,
  description: state.algorithmDescription,
});

const addAlgorithm = (): SnowmanThunkAction<
  Promise<void>,
  AlgorithmDialogModel
> => async (
  dispatch: SnowmanDispatch<AlgorithmDialogModel>,
  getState: () => AlgorithmDialogModel
): Promise<void> =>
  RequestHandler<void>(
    (): Promise<void> =>
      new AlgorithmApi()
        .addAlgorithm({
          algorithm: getAlgorithmValues(getState()),
        })
        .then((): void => {
          dispatch(resetDialog());
        })
        .finally((): void => {
          doCloseDialog();
          doRefreshCentralResources();
        }),
    SUCCESS_TO_ADD_NEW_ALGORITHM,
    true
  );

const updateAlgorithm = (
  algorithmId: EntityId
): SnowmanThunkAction<Promise<void>, AlgorithmDialogModel> => async (
  dispatch: SnowmanDispatch<AlgorithmDialogModel>,
  getState: () => AlgorithmDialogModel
): Promise<void> =>
  RequestHandler(
    (): Promise<void> =>
      new AlgorithmApi()
        .setAlgorithm({
          algorithmId: algorithmId ?? MagicNotPossibleId,
          algorithm: getAlgorithmValues(getState()),
        })
        .then((): void => dispatch(resetDialog()))
        .finally((): void => {
          doCloseDialog();
          doRefreshCentralResources();
        }),
    SUCCESS_TO_UPDATE_ALGORITHM,
    true
  );

export const addOrUpdateAlgorithm = (
  algorithmId: EntityId
): SnowmanThunkAction<Promise<void>, AlgorithmDialogModel> => async (
  dispatch: SnowmanDispatch<AlgorithmDialogModel>
): Promise<void> => {
  if (algorithmId === null) {
    return dispatch(addAlgorithm());
  }
  return dispatch(updateAlgorithm(algorithmId));
};

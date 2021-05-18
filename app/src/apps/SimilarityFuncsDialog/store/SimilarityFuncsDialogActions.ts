import { SimilarityThresholdFunction, SimilarityThresholdsApi } from 'api';
import { SimilarityFuncsDialogActionTypes } from 'apps/SimilarityFuncsDialog/types/SimilarityFuncsDialogActionTypes';
import { SimilarityFuncsDialogModel } from 'apps/SimilarityFuncsDialog/types/SimilarityFuncsDilaogModel';
import { doRefreshCentralResources } from 'apps/SnowmanApp/store/CentralResourcesDoActions';
import { SnowmanAppMagistrate } from 'apps/SnowmanApp/store/SnowmanAppStore';
import { head } from 'lodash';
import { MagicNotPossibleId } from 'structs/constants';
import { SUCCESS_TO_DELETE_SIMILARITY_THRESHOLD_FUNCTION } from 'structs/statusMessages';
import { EntityId } from 'types/EntityId';
import { EntityType } from 'types/EntityType';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';
import RequestHandler from 'utils/requestHandler';

export const changeSearchString = (
  newSearchString: string
): easyPrimitiveActionReturn<SimilarityFuncsDialogModel> =>
  easyPrimitiveAction<SimilarityFuncsDialogModel>({
    type: SimilarityFuncsDialogActionTypes.CHANGE_SEARCH_STRING,
    payload: newSearchString,
  });

export const resetDialog = (): easyPrimitiveActionReturn<SimilarityFuncsDialogModel> =>
  easyPrimitiveAction<SimilarityFuncsDialogModel>({
    type: SimilarityFuncsDialogActionTypes.RESET_DIALOG,
    // reducer ignores payload
    payload: false,
  });

const getSimilarityThresholdFunctions = (
  experimentId: EntityId
): SnowmanThunkAction<Promise<void>, SimilarityFuncsDialogModel> => (
  dispatch: SnowmanDispatch<SimilarityFuncsDialogModel>
): Promise<void> => {
  return RequestHandler<void>(
    (): Promise<void> =>
      new SimilarityThresholdsApi()
        .getSimilarityThresholdFunctions()
        .then(
          (
            functions: SimilarityThresholdFunction[]
          ): SimilarityThresholdFunction[] =>
            functions.filter(
              (aFunction: SimilarityThresholdFunction): boolean =>
                aFunction.experimentId === experimentId
            )
        )
        .then((functions: SimilarityThresholdFunction[]): void => {
          dispatch({
            type: SimilarityFuncsDialogActionTypes.LOAD_SIMILARITY_FUNCTIONS,
            payload: functions,
          });
        })
  );
};

export const loadInitialState = (
  dispatch: SnowmanDispatch<SimilarityFuncsDialogModel>,
  entityId: EntityId,
  _?: EntityType
): void => {
  dispatch(resetDialog());
  dispatch(getSimilarityThresholdFunctions(entityId)).then();
};

export const deleteSimilarityThresholdFunction = (
  functionId: number
): SnowmanThunkAction<Promise<void>, SimilarityFuncsDialogModel> => (
  dispatch: SnowmanDispatch<SimilarityFuncsDialogModel>
): Promise<void> => {
  const experimentId =
    head(
      SnowmanAppMagistrate.getStore().getState().RenderLogicStore.dialogStack
    )?.entityId ?? MagicNotPossibleId;
  return RequestHandler<void>(
    (): Promise<void> =>
      new SimilarityThresholdsApi().deleteSimilarityThresholdFunction({
        functionId: functionId,
      }),
    SUCCESS_TO_DELETE_SIMILARITY_THRESHOLD_FUNCTION
  )
    .then(
      (): Promise<void> =>
        dispatch(getSimilarityThresholdFunctions(experimentId))
    )
    .then(() => doRefreshCentralResources());
};

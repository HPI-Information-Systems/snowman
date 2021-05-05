import { SimilarityThresholdFunction, SimilarityThresholdsApi } from 'api';
import { SimilarityFuncsDialogActionTypes } from 'apps/SimilarityFuncsDialog/types/SimilarityFuncsDialogActionTypes';
import { SimilarityFuncsDialogModel } from 'apps/SimilarityFuncsDialog/types/SimilarityFuncsDilaogModel';
import { SnowmanAppMagistrate } from 'apps/SnowmanApp/store/SnowmanAppStore';
import { MagicNotPossibleId } from 'structs/constants';
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

const getSimilarityThresholdFunctions = (
  experimentId: EntityId
): SnowmanThunkAction<Promise<void>, SimilarityFuncsDialogModel> => (
  dispatch: SnowmanDispatch<SimilarityFuncsDialogModel>
): Promise<void> => {
  return RequestHandler<void>(
    (): Promise<void> =>
      new SimilarityThresholdsApi()
        .getSimilarityThresholdFunctions({
          experimentId: experimentId ?? MagicNotPossibleId,
        })
        .then((functions: SimilarityThresholdFunction[]): void => {
          dispatch({
            type: SimilarityFuncsDialogActionTypes.LOAD_SIMILARITY_FUNCTIONS,
            payload: functions,
          });
        })
  );
};

export const loadSimilarityThresholdFunctionsOnDialogOpen = (
  dispatch: SnowmanDispatch<SimilarityFuncsDialogModel>,
  entityId: EntityId,
  _?: EntityType
): void => {
  dispatch(getSimilarityThresholdFunctions(entityId)).then();
};

export const deleteSimilarityThresholdFunction = (
  functionId: number
): SnowmanThunkAction<Promise<void>, SimilarityFuncsDialogModel> => (
  dispatch: SnowmanDispatch<SimilarityFuncsDialogModel>
): Promise<void> => {
  const experimentId =
    SnowmanAppMagistrate.getStore().getState().RenderLogicStore.entityId ??
    MagicNotPossibleId;
  return RequestHandler<void>(
    (): Promise<void> =>
      new SimilarityThresholdsApi().deleteSimilarityThresholdFunction({
        experimentId: experimentId,
        functionId: functionId,
      })
  ).then(
    (): Promise<void> => dispatch(getSimilarityThresholdFunctions(experimentId))
  );
};

import { SimilarityThresholdFunction, SimilarityThresholdsApi } from 'api';
import { SimilarityFuncsDialogActionTypes } from 'apps/SimilarityFuncsDialog/types/SimilarityFuncsDialogActionTypes';
import { SimilarityFuncsDialogModel } from 'apps/SimilarityFuncsDialog/types/SimilarityFuncsDilaogModel';
import { SnowmanAppMagistrate } from 'apps/SnowmanApp/store/SnowmanAppStore';
import { MagicNotPossibleId } from 'structs/constants';
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

export const getSimilarityThresholdFunctions = (): SnowmanThunkAction<
  Promise<void>,
  SimilarityFuncsDialogModel
> => (dispatch: SnowmanDispatch<SimilarityFuncsDialogModel>): Promise<void> => {
  return RequestHandler<void>(
    (): Promise<void> =>
      new SimilarityThresholdsApi()
        .getSimilarityThresholdFunctions({
          experimentId:
            SnowmanAppMagistrate.getStore().getState().RenderLogicStore
              .entityId ?? MagicNotPossibleId,
        })
        .then((functions: SimilarityThresholdFunction[]): void => {
          dispatch({
            type: SimilarityFuncsDialogActionTypes.LOAD_SIMILARITY_FUNCTIONS,
            payload: functions,
          });
        })
  );
};

export const deleteSimilarityThresholdFunction = (
  functionId: number
): SnowmanThunkAction<Promise<void>, SimilarityFuncsDialogModel> => (
  dispatch: SnowmanDispatch<SimilarityFuncsDialogModel>
): Promise<void> => {
  return RequestHandler<void>(
    (): Promise<void> =>
      new SimilarityThresholdsApi().deleteSimilarityThresholdFunction({
        experimentId:
          SnowmanAppMagistrate.getStore().getState().RenderLogicStore
            .entityId ?? MagicNotPossibleId,
        functionId: functionId,
      })
  ).then((): Promise<void> => dispatch(getSimilarityThresholdFunctions()));
};

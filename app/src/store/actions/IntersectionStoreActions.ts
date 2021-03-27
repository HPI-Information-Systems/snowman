import { IntersectionStoreActionTypes as actionTypes } from 'store/actions/actionTypes';
import { store } from 'store/store';

import { BenchmarkApi, Experiment } from '../../api';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from '../../utils/easyActionsFactory';
import RequestHandler from '../../utils/requestHandler';
import { SnowmanDispatch, SnowmanThunkAction } from '../messages';

export const includeExperiment = (
  experiment: Experiment
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.INCLUDE_EXPERIMENT,
    payload: experiment,
  });

export const excludeExperiment = (
  experiment: Experiment
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.EXCLUDE_EXPERIMENT,
    payload: experiment,
  });

export const ignoreExperiment = (
  experiment: Experiment
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.IGNORE_EXPERIMENT,
    payload: experiment,
  });

export const resetIntersection = (payload?: {
  excluded: Experiment[];
  included: Experiment[];
}): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.RESET_INTERSECTION,
    payload: payload ?? false,
  });

export const loadCounts = (): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> => {
  const config = store.getState().BenchmarkConfigurationStore;
  dispatch({
    type: actionTypes.SET_COUNTS,
    payload: await RequestHandler(
      () =>
        new BenchmarkApi().calculateExperimentIntersectionPairCounts({
          experimentIntersectionPairCountsRequestExperiments: [
            ...config.chosenExperiments.map(({ id }) => ({ experimentId: id })),
            ...config.chosenGoldStandards.map(({ id }) => ({
              experimentId: id,
            })),
          ],
        }),
      dispatch
    ),
  });
};

import { BenchmarkApi, Metric } from 'api';
import { SnowmanDispatch, SnowmanThunkAction } from 'store/messages';
import { store } from 'store/store';
import RequestHandler from 'utils/requestHandler';

import { Store } from '../models';

export const getGroundTruthId = (state: Store = store.getState()): number => {
  return state.BenchmarkConfigurationStore.chosenGoldStandards[0].id;
};

export const getMetrics = (
  experimentId: number,
  successMessage?: string,
  shouldBlock?: boolean
): SnowmanThunkAction<Promise<Metric[]>> => async (
  dispatch: SnowmanDispatch
): Promise<Metric[]> => {
  return RequestHandler<Metric[]>(
    () =>
      new BenchmarkApi().getBinaryMetrics({
        experimentId1: getGroundTruthId(),
        experimentId2: experimentId,
      }),
    dispatch,
    successMessage,
    shouldBlock
  );
};

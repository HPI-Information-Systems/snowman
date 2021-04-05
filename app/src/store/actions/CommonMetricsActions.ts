import { BenchmarkApi, Metric } from 'api';
import { SnowmanDispatch, SnowmanThunkAction } from 'store/messages';
import { Store } from 'store/models';
import { store } from 'store/store';
import RequestHandler from 'utils/requestHandler';

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
        groundTruthExperimentId: getGroundTruthId(),
        predictedExperimentId: experimentId,
      }),
    dispatch,
    successMessage,
    shouldBlock
  );
};

import { BenchmarkApi, Metric } from 'api';
import { SnowmanDispatch, SnowmanThunkAction } from 'store/messages';
import { store } from 'store/store';
import RequestHandler from 'utils/requestHandler';

export const getGroundTruthId = (): number => {
  return store.getState().BenchmarkConfigurationStore.chosenGoldStandards[0].id;
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

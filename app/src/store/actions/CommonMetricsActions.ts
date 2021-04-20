import { BenchmarkApi, Experiment, Metric } from 'api';
import { SnowmanThunkAction } from 'store/messages';
import { ImmediateStore } from 'store/models';
import { store } from 'store/store';
import RequestHandler from 'utils/requestHandler';

export const getGroundTruth = (
  state: ImmediateStore = store.getState()
): Experiment => {
  return state.BenchmarkConfigurationStore.chosenGoldStandards[0];
};

export const getGroundTruthId = (
  state: ImmediateStore = store.getState()
): number => {
  return getGroundTruth(state).id;
};

export const getMetrics = (
  experimentId: number,
  successMessage?: string,
  shouldBlock?: boolean
): SnowmanThunkAction<Promise<Metric[]>> => async (): Promise<Metric[]> => {
  return RequestHandler<Metric[]>(
    () =>
      new BenchmarkApi().getBinaryMetrics({
        groundTruthExperimentId: getGroundTruthId(),
        predictedExperimentId: experimentId,
      }),
    successMessage,
    shouldBlock
  );
};

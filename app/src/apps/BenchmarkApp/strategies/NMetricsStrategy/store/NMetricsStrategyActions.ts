import { BenchmarkApi, Experiment, Metric } from 'api';
import { NMetricsStrategyActionTypes } from 'apps/BenchmarkApp/strategies/NMetricsStrategy/types/NMetricsStrategyActionTypes';
import { NMetricsStrategyModel } from 'apps/BenchmarkApp/strategies/NMetricsStrategy/types/NMetricsStrategyModel';
import { BenchmarkAppConfigStore } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { MagicNotPossibleId } from 'structs/constants';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

export const updateConfig = (
  benchmarkConfig: BenchmarkAppConfigStore
): easyPrimitiveActionReturn<NMetricsStrategyModel> =>
  easyPrimitiveAction<NMetricsStrategyModel>({
    type: NMetricsStrategyActionTypes.UPDATE_CONFIG,
    payload: benchmarkConfig,
  });

export const setMetrics = (
  aMetricArray: Metric[][]
): easyPrimitiveActionReturn<NMetricsStrategyModel> =>
  easyPrimitiveAction<NMetricsStrategyModel>({
    type: NMetricsStrategyActionTypes.SET_METRICS,
    payload: aMetricArray,
  });

export const resetMetrics = (): easyPrimitiveActionReturn<NMetricsStrategyModel> =>
  easyPrimitiveAction<NMetricsStrategyModel>({
    type: NMetricsStrategyActionTypes.RESET_METRICS,
    // payload is not used
    payload: false,
  });
export const loadNMetrics = (): SnowmanThunkAction<
  void,
  NMetricsStrategyModel
> => (
  dispatch: SnowmanDispatch<NMetricsStrategyModel>,
  getState: () => NMetricsStrategyModel
): void => {
  if (!getState().isValidConfig) {
    return;
  }
  const goldStandard = getState().goldStandard;
  dispatch(resetMetrics());
  Promise.all(
    getState().experiments.map((anExperiment: Experiment) =>
      new BenchmarkApi().getBinaryMetrics({
        groundTruthExperimentId: goldStandard?.id ?? MagicNotPossibleId,
        predictedExperimentId: anExperiment.id,
      })
    )
  ).then((metrics: Metric[][]): void => {
    dispatch(setMetrics(metrics));
  });
};
export const loadStrategyData = (
  dispatch: SnowmanDispatch<NMetricsStrategyModel>,
  benchmarkConfig: BenchmarkAppConfigStore
): void => {
  dispatch(updateConfig(benchmarkConfig));
  dispatch(loadNMetrics());
};

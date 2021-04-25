import { BenchmarkApi, Experiment, Metric } from 'api';
import {
  resetMetrics,
  setMetrics,
  updateConfig,
} from 'apps/BenchmarkApp/strategies/NMetricsStrategy/store/NMetricsStrategyActions';
import { NMetricsStrategyModel } from 'apps/BenchmarkApp/strategies/NMetricsStrategy/types/NMetricsStrategyModel';
import { BenchmarkAppConfigStore } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { MagicNotPossibleId } from 'structs/constants';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';

export const loadNMetrics = (): SnowmanThunkAction<
  void,
  NMetricsStrategyModel
> => (
  dispatch: SnowmanDispatch<NMetricsStrategyModel>,
  getState: () => NMetricsStrategyModel
): void => {
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
  console.log('updated strategy data');
  dispatch(updateConfig(benchmarkConfig));
  dispatch(loadNMetrics());
};

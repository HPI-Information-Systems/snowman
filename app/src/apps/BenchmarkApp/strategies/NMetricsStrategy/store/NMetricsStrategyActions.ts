import { BenchmarkApi, Metric } from 'api';
import { NMetricsStrategyActionTypes } from 'apps/BenchmarkApp/strategies/NMetricsStrategy/types/NMetricsStrategyActionTypes';
import { NMetricsStrategyModel } from 'apps/BenchmarkApp/strategies/NMetricsStrategy/types/NMetricsStrategyModel';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { MagicNotPossibleId } from 'structs/constants';
import { ExperimentEntity } from 'types/ExperimentEntity';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';
import RequestHandler from 'utils/requestHandler';

export const updateConfig = (
  appStore: BenchmarkAppModel
): easyPrimitiveActionReturn<NMetricsStrategyModel> =>
  easyPrimitiveAction<NMetricsStrategyModel>({
    type: NMetricsStrategyActionTypes.UPDATE_CONFIG,
    payload: appStore,
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
  const groundTruth = getState().groundTruth;
  dispatch(resetMetrics());
  Promise.all(
    getState().experiments.map((anEntity: ExperimentEntity) =>
      RequestHandler(() =>
        new BenchmarkApi().getBinaryMetrics({
          groundTruthSimilarityThresholdFunction:
            groundTruth?.similarity?.func.id,
          groundTruthSimilarityThreshold: groundTruth?.similarity?.threshold,
          groundTruthExperimentId:
            groundTruth?.experiment.id ?? MagicNotPossibleId,
          predictedSimilarityThresholdFunction: anEntity.similarity?.func.id,
          predictedSimilarityThreshold: anEntity.similarity?.threshold,
          predictedExperimentId: anEntity.experiment?.id ?? MagicNotPossibleId,
        })
      )
    )
  ).then((metrics: Metric[][]): void => {
    dispatch(setMetrics(metrics));
  });
};
export const loadStrategyData = (
  dispatch: SnowmanDispatch<NMetricsStrategyModel>,
  appStore: BenchmarkAppModel
): void => {
  dispatch(updateConfig(appStore));
  dispatch(loadNMetrics());
};

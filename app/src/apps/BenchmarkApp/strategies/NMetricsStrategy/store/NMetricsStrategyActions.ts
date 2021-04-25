import { Metric } from 'api';
import { NMetricsStrategyActionTypes } from 'apps/BenchmarkApp/strategies/NMetricsStrategy/types/NMetricsStrategyActionTypes';
import { NMetricsStrategyModel } from 'apps/BenchmarkApp/strategies/NMetricsStrategy/types/NMetricsStrategyModel';
import { BenchmarkAppConfigStore } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
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

import { NMetricsStrategyModel } from 'apps/BenchmarkApp/strategies/NMetricsStrategy/types/NMetricsStrategyModel';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: NMetricsStrategyModel = {
  metrics: [],
};

const NMetricsStrategyReducer = (
  state: NMetricsStrategyModel = initialState,
  action: SnowmanAction
): NMetricsStrategyModel => state;

export default NMetricsStrategyReducer;

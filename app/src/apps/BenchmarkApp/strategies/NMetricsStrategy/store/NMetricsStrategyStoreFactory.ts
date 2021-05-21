import NMetricsStrategyReducer from 'apps/BenchmarkApp/strategies/NMetricsStrategy/store/NMetricsStrategyReducer';
import { NMetricsStrategyModel } from 'apps/BenchmarkApp/strategies/NMetricsStrategy/types/NMetricsStrategyModel';
import { StoreMagistrate } from 'utils/storeFactory';

export const NMetricsStrategyStoreMagistrate = new StoreMagistrate<NMetricsStrategyModel>(
  'NMetricsStrategyStore',
  NMetricsStrategyReducer
);

import BinaryMetricsStrategyReducer from 'apps/BenchmarkApp/strategies/BinaryMetricsStrategy/store/BinaryMetricsStrategyReducer';
import { BinaryMetricsStrategyModel } from 'apps/BenchmarkApp/strategies/BinaryMetricsStrategy/types/BinaryMetricsStrategyModel';
import { StoreMagistrate } from 'utils/storeFactory';

export const BinaryMetricsStrategyStoreMagistrate = new StoreMagistrate<BinaryMetricsStrategyModel>(
  'BinaryMetricsStrategyStore',
  BinaryMetricsStrategyReducer
);

import NMetricsStrategyReducer from 'apps/BenchmarkApp/strategies/NMetricsStrategy/store/NMetricsStrategyReducer';
import { NMetricsStrategyModel } from 'apps/BenchmarkApp/strategies/NMetricsStrategy/types/NMetricsStrategyModel';
import { Store } from 'redux';
import { SnowmanAction } from 'types/SnowmanAction';
import { constructStore } from 'utils/storeFactory';

export const createNMetricsStrategyStore = (): Store<
  NMetricsStrategyModel,
  SnowmanAction
> =>
  constructStore<NMetricsStrategyModel>(
    'NMetricsStrategyStore',
    NMetricsStrategyReducer
  );

import IntersectionStrategyReducer from 'apps/BenchmarkApp/strategies/IntersectionStrategy/store/IntersectionStrategyReducer';
import { IntersectionStrategyModel } from 'apps/BenchmarkApp/strategies/IntersectionStrategy/types/IntersectionStrategyModel';
import { StoreMagistrate } from 'utils/storeFactory';

export const IntersectionStrategyStoreMagistrate = new StoreMagistrate<IntersectionStrategyModel>(
  'IntersectionStrategyStore',
  IntersectionStrategyReducer
);

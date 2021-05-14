import DecisionMatrixStrategyReducer from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/store/DecisionMatrixStrategyReducer';
import { StoreMagistrate } from 'utils/storeFactory';

export const DecisionMatrixStrategyStoreMagistrate = new StoreMagistrate(
  'DecisionMatrixStrategyStore',
  DecisionMatrixStrategyReducer
);

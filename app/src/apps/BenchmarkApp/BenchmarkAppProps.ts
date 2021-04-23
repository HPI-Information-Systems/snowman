import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';

export interface BenchmarkAppDispatchProps {
  loadInitialState: () => void;
}

export interface BenchmarkAppStateProps {
  activeStrategy: StrategyIDs;
  benchmarkState: BenchmarkAppModel;
}

export type BenchmarkAppProps = BenchmarkAppStateProps &
  BenchmarkAppDispatchProps;

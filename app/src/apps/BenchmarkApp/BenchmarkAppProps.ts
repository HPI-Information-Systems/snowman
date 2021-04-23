import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';

export interface BenchmarkAppDispatchProps {
  loadInitialState: () => void;
}

export interface BenchmarkAppStateProps {
  currentStrategy: StrategyIDs;
}

export type BenchmarkAppProps = BenchmarkAppStateProps &
  BenchmarkAppDispatchProps;

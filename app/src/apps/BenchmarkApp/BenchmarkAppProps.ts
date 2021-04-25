import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';

export interface BenchmarkAppDispatchProps {
  loadInitialState: () => void;
  openStrategy(id: StrategyIDs): void;
}

export interface BenchmarkAppStateProps {
  activeStrategy: StrategyIDs;
}

export type BenchmarkAppProps = BenchmarkAppStateProps &
  BenchmarkAppDispatchProps;

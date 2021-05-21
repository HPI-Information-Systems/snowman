import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';

export interface DashboardStrategyOwnProps {
  openStrategy(id: StrategyIDs): void;
}

export type DashboardStrategyProps = DashboardStrategyOwnProps;

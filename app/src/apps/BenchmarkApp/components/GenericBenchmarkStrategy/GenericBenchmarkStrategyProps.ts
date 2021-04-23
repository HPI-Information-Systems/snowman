import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import { Store } from 'redux';
import { SnowmanAction } from 'types/SnowmanAction';

export interface GenericBenchmarkStrategyStateProps {
  activeStrategy: StrategyIDs;
}

export interface GenericBenchmarkStrategyOwnProps {
  strategyId: StrategyIDs;
  children?: JSX.Element | JSX.Element[];
  createStrategyStore(): Store<unknown, SnowmanAction>;
}

export type GenericBenchmarkStrategyProps = GenericBenchmarkStrategyOwnProps &
  GenericBenchmarkStrategyStateProps;

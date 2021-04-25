import { BenchmarkAppConfigStore } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import { Store } from 'redux';
import { SnowmanAction } from 'types/SnowmanAction';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

export interface GenericBenchmarkStrategyStateProps {
  activeStrategy: StrategyIDs;
  benchmarkConfig: BenchmarkAppConfigStore;
}

export interface GenericBenchmarkStrategyOwnProps {
  strategyId: StrategyIDs;
  children?: JSX.Element | JSX.Element[];
  createStrategyStore(): Store<unknown, SnowmanAction>;
  loadStrategyData?(
    dispatch: SnowmanDispatch<unknown>,
    config: BenchmarkAppConfigStore
  ): void;
}

export type GenericBenchmarkStrategyProps = GenericBenchmarkStrategyOwnProps &
  GenericBenchmarkStrategyStateProps;

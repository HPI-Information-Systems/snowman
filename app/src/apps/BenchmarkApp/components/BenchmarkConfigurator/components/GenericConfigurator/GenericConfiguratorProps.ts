import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';

export interface GenericConfiguratorOwnProps {
  children: JSX.Element | JSX.Element[];
  strategyID: StrategyIDs;
}

export interface GenericConfiguratorStateProps {
  isVisible: boolean;
}

export type GenericConfiguratorProps = GenericConfiguratorOwnProps &
  GenericConfiguratorStateProps;

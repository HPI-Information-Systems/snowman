import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import React from 'react';

export interface GenericConfiguratorOwnProps {
  children: JSX.Element | JSX.Element[];
  strategyID: StrategyIDs;
}

export interface GenericConfiguratorStateProps {
  isVisible: boolean;
}

export type GenericConfiguratorProps = GenericConfiguratorOwnProps &
  GenericConfiguratorStateProps;

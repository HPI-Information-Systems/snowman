import { StrategyMapItem } from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMap';
import { StrategyMapperForwardProps } from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapperProps';
import { FunctionBuildingBlockType } from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';

export type StrategyViewerOwnProps = StrategyMapperForwardProps;

export interface StrategyViewerStateProps {
  strategyType: FunctionBuildingBlockType;
}

export interface StrategyViewerOwnStateProps {
  targetStrategy: StrategyMapItem | undefined;
}

export type StrategyViewerProps = StrategyViewerOwnProps &
  StrategyViewerStateProps;

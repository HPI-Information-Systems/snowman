import { StrategyMapItem } from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMap';
import { FunctionBuildingBlockType } from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';

export interface StrategyMapperForwardProps {
  nextStrategyType: FunctionBuildingBlockType;
  setNextStrategyType(nextStrategy: FunctionBuildingBlockType): void;
}

export interface StrategyMapperOwnProps {
  blockAccessKey?: number;
}

export interface StrategyMapperStateProps {
  targetStrategy: StrategyMapItem | undefined;
}

export type StrategyMapperProps = StrategyMapperForwardProps &
  StrategyMapperOwnProps;

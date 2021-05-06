import { FunctionBuildingBlockType } from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';

export interface StrategyMapperForwardProps {
  nextStrategyType: FunctionBuildingBlockType;
  setNextStrategyType(nextStrategy: FunctionBuildingBlockType): void;
}

export type StrategyMapperProps = StrategyMapperForwardProps;

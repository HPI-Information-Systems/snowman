import { CellDescriptor } from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';

export interface StrategyMapperForwardProps {
  blockAccessKey: number;
}

export interface StrategyMapperOwnProps {
  parentAccessKey: number | null;
  ownLocation?: CellDescriptor;
}

export type StrategyMapperProps = StrategyMapperForwardProps &
  StrategyMapperOwnProps;

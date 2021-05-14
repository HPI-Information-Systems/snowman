import { CellDescriptor } from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';

export interface StrategyMapperForwardProps {
  blockAccessKey: number;
}

export interface StrategyMapperProps {
  parentAccessKey: number | null;
  ownLocation?: CellDescriptor;
}

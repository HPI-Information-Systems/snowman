import { StrategyMapItem } from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMap';
import { CellDescriptor } from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';

export interface StrategyMapperForwardProps {
  blockAccessKey: number;
}

export interface StrategyMapperStateProps {
  targetStrategy: StrategyMapItem | undefined;
}

export interface StrategyMapperProps {
  parentAccessKey: number | null;
  ownLocation?: CellDescriptor;
}

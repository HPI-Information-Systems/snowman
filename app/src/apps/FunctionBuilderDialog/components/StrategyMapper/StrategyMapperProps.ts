import { StrategyMapItem } from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMap';
import { CellDescriptor } from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';

export interface StrategyMapperForwardProps {
  blockAccessKey: number;
}

export interface StrategyMapperOwnProps {
  parentAccessKey: number | null;
  ownLocation?: CellDescriptor;
}

export interface StrategyMapperStateProps {
  targetStrategy: StrategyMapItem | undefined;
}

export type StrategyMapperProps = StrategyMapperForwardProps &
  StrategyMapperOwnProps;

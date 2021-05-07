import { StrategyMapItem } from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMap';
import {
  CellDescriptor,
  FunctionBuildingBlockType,
} from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';

export type chooseStrategyFunction = (
  strategy: FunctionBuildingBlockType
) => void;

export interface StrategyMapperForwardProps {
  nextStrategyType: FunctionBuildingBlockType;
  setNextStrategyType: chooseStrategyFunction;
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

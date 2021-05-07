import { StrategyMapItem } from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMap';
import {
  CellDescriptor,
  FunctionBuildingBlockType,
} from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';
import { FunctionToChooseStrategy } from 'apps/FunctionBuilderDialog/types/FunctionToChooseStrategy';

export interface StrategyMapperForwardProps {
  nextStrategyType: FunctionBuildingBlockType;
  setNextStrategyType: FunctionToChooseStrategy;
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

import { StrategyMapperForwardProps } from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapperProps';
import { FunctionBuildingBlockType } from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';

export type StrategySelectorOwnProps = StrategyMapperForwardProps;

export interface StrategySelectorStateProps {
  chosenStrategyType: FunctionBuildingBlockType;
}

export interface StrategySelectorDispatchProps {
  setStrategyType: (strategyType: FunctionBuildingBlockType) => void;
}

export type StrategySelectorProps = StrategySelectorOwnProps &
  StrategySelectorStateProps &
  StrategySelectorDispatchProps;

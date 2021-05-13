import { StrategyMapperForwardProps } from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapperProps';

export type StrategyUnselectorOwnProps = StrategyMapperForwardProps;

export interface StrategyUnselectorDispatchProps {
  unselectStrategy(): void;
}

export interface StrategyUnselectorStateProps {
  isStrategySelected: boolean;
}

export type StrategyUnselectorProps = StrategyUnselectorOwnProps &
  StrategyUnselectorDispatchProps &
  StrategyUnselectorStateProps;

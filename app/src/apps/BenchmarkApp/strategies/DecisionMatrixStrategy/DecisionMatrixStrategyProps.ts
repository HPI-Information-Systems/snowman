import { Algorithm } from 'api';

export interface DecisionMatrixStrategyStateProps {
  isValidConfig: boolean;
  selectedAlgorithms: Algorithm[];
}

export type DecisionMatrixStrategyProps = DecisionMatrixStrategyStateProps;

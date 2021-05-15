import { Algorithm, Metric } from 'api';

export interface DecisionMatrixStrategyStateProps {
  isValidConfig: boolean;
  selectedAlgorithms: Algorithm[];
  averageMetrics: Metric[][];
}

export interface DecisionMatrixStrategyDispatchProps {
  editAlgorithm: (id: number) => void;
}

export type DecisionMatrixStrategyProps = DecisionMatrixStrategyStateProps &
  DecisionMatrixStrategyDispatchProps;

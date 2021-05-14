import { Algorithm, Metric } from 'api';

export interface DecisionMatrixStrategyStateProps {
  isValidConfig: boolean;
  selectedAlgorithms: Algorithm[];
  averageMetrics: Metric[][];
}

export type DecisionMatrixStrategyProps = DecisionMatrixStrategyStateProps;

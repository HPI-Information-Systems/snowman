import { Algorithm, Metric } from 'api';
import { ExpansionTypes } from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/types/ExpansionTypes';

export interface DecisionMatrixStrategyStateProps {
  isValidConfig: boolean;
  selectedAlgorithms: Algorithm[];
  averageMetrics: Metric[][];
  expandedEntities: ExpansionTypes[];
}

export interface DecisionMatrixStrategyDispatchProps {
  toggleExpansion: (aType: ExpansionTypes) => void;
}

export type DecisionMatrixStrategyProps = DecisionMatrixStrategyStateProps &
  DecisionMatrixStrategyDispatchProps;

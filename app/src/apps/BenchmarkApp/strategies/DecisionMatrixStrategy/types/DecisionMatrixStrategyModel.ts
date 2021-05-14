import { Metric } from 'api';
import { EnhancedAlgorithm } from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/types/EnhancedAlgorithm';

export interface DecisionMatrixStrategyModel {
  isValidConfig: boolean;
  enhancedAlgorithms: EnhancedAlgorithm[];
  averageMetrics: Metric[][];
}

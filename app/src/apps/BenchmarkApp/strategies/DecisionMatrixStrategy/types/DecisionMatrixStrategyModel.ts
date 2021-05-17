import { Metric } from 'api';
import { EnhancedAlgorithm } from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/types/EnhancedAlgorithm';
import { ExpansionTypes } from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/types/ExpansionTypes';

export interface DecisionMatrixStrategyModel {
  isValidConfig: boolean;
  enhancedAlgorithms: EnhancedAlgorithm[];
  averageMetrics: Metric[][];
  expandedEntities: ExpansionTypes[];
}

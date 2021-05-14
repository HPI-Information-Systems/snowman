import { Algorithm, Metric } from 'api';
import { MetricEntity } from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/types/MetricEntity';

export interface DecisionMatrixStrategyModel {
  isValidConfig: boolean;
  selectedAlgorithms: Algorithm[];
  metricEntities: MetricEntity[];
  metrics: Metric[][];
}

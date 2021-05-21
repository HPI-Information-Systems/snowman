import { Algorithm } from 'api';
import { MetricEntity } from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/types/MetricEntity';

export interface EnhancedAlgorithm {
  algorithm: Algorithm;
  metricEntities: MetricEntity[];
}

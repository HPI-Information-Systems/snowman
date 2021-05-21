import { Metric } from 'api';
import { ExperimentEntity } from 'types/ExperimentEntity';

export interface NMetricsStrategyModel {
  experiments: ExperimentEntity[];
  groundTruth: ExperimentEntity | undefined;
  metrics: Metric[][];
  isValidConfig: boolean;
}

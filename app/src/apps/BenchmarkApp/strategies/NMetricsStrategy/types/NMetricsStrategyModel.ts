import { Experiment, Metric } from 'api';

export interface NMetricsStrategyModel {
  experiments: Experiment[];
  groundTruth: Experiment | undefined;
  metrics: Metric[][];
  isValidConfig: boolean;
}

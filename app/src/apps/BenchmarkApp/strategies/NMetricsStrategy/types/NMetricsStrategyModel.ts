import { Experiment, Metric } from 'api';

export interface NMetricsStrategyModel {
  experiments: Experiment[];
  goldStandard: Experiment | undefined;
  metrics: Metric[][];
  isValidConfig: boolean;
}

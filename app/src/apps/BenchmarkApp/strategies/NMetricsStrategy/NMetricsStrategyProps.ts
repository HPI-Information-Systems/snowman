import { Experiment, Metric } from 'api';

export interface NMetricsStrategyStateProps {
  metrics: Metric[][];
  experiments: Experiment[];
}

export interface NMetricsStrategyOwnProps {
  targetExperimentIds: number[];
  availableExperiments: Experiment[];
}

export interface NMetricsStrategyDispatchProps {
  loadMetrics(): void;
  inspectExperiment(anExperiment: Experiment): void;
}

export type NMetricsStrategyProps = NMetricsStrategyStateProps &
  NMetricsStrategyDispatchProps;

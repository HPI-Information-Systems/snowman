import { Experiment, Metric } from 'api';

export interface NMetricsPageStateProps {
  metrics: Metric[][];
  experiments: Experiment[];
}

export interface NMetricsPageDispatchProps {
  loadMetrics(): void;
}

export type NMetricsPageProps = NMetricsPageStateProps &
  NMetricsPageDispatchProps;

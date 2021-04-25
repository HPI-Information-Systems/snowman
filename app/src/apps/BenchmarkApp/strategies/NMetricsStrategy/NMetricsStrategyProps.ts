import { Experiment, Metric } from 'api';

export interface NMetricsStrategyStateProps {
  metrics: Metric[][];
  experiments: Experiment[];
  goldStandard: Experiment | undefined;
  isValidSelection: boolean;
}

export interface NMetricsStrategyDispatchProps {
  inspectExperiment(anExperiment: Experiment): void;
}

export type NMetricsStrategyProps = NMetricsStrategyStateProps &
  NMetricsStrategyDispatchProps;

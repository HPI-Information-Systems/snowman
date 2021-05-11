import { Experiment, Metric } from 'api';
import { ExperimentEntity } from 'types/ExperimentEntity';

export interface NMetricsStrategyStateProps {
  metrics: Metric[][];
  experiments: ExperimentEntity[];
  goldStandard: Experiment | undefined;
  isValidSelection: boolean;
}

export interface NMetricsStrategyDispatchProps {
  inspectExperiment(anExperimentEntity: ExperimentEntity): void;
}

export type NMetricsStrategyProps = NMetricsStrategyStateProps &
  NMetricsStrategyDispatchProps;

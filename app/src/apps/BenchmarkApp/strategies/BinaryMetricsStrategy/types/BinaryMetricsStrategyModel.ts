import { Dataset, Experiment, ExperimentIntersectionCount, Metric } from 'api';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';

export interface BinaryMetricsStrategyModel {
  isValidConfig: boolean;
  experiment: Experiment | undefined;
  goldStandard: Experiment | undefined;
  dataset: Dataset | undefined;
  counts: ExperimentIntersectionCount[];
  metrics: Metric[];
  selectedDataView: MetricsTuplesCategories;
}
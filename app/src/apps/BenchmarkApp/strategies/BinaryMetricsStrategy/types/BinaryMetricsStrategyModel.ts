import { Dataset, ExperimentIntersectionCount, Metric } from 'api';
import { ExperimentEntity } from 'types/ExperimentEntity';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';

export interface BinaryMetricsStrategyModel {
  isValidConfig: boolean;
  experiment: ExperimentEntity | undefined;
  groundTruth: ExperimentEntity | undefined;
  dataset: Dataset | undefined;
  counts: ExperimentIntersectionCount[];
  metrics: Metric[];
  selectedDataView: MetricsTuplesCategories;
}

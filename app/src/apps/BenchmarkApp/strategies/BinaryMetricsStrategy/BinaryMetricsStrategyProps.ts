import { Metric } from 'api';
import { ConfusionMatrix } from 'types/ConfusionMatrix';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';
import { TuplesLoader } from 'types/TuplesLoader';

export interface BinaryMetricsStrategyDispatchProps {
  selectPane(aMetricsTuplesCategory: MetricsTuplesCategories): void;
}

export interface BinaryMetricsStrategyStateProps {
  rowCount: number;
  metrics: Metric[];
  selectedMetricsTuplesCategory: MetricsTuplesCategories;
  metricsTuplesCategories: MetricsTuplesCategories[];
  tuplesLoader: TuplesLoader;
  confusionMatrix: ConfusionMatrix;
  dataViewerTitle: string;
  isValidConfig: boolean;
}

export type BinaryMetricsStrategyProps = BinaryMetricsStrategyStateProps &
  BinaryMetricsStrategyDispatchProps;

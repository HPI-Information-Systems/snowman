import { Metric } from 'api';
import { ConfusionMatrix } from 'types/ConfusionMatrix';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';
import { TuplesLoader } from 'types/TuplesLoader';

export interface BinaryMetricsPageDispatchProps {
  loadMetrics(): void;
  preloadTuplesCounts(): void;
  selectPane(aMetricsTuplesCategory: MetricsTuplesCategories): void;
}

export interface BinaryMetricsPageStateProps {
  rowCount: number;
  metrics: Metric[];
  selectedMetricsTuplesCategory: MetricsTuplesCategories;
  metricsTuplesCategories: MetricsTuplesCategories[];
  tuplesLoader: TuplesLoader;
  confusionMatrix: ConfusionMatrix;
  dataViewerTitle: string;
}

export type BinaryMetricsPageProps = BinaryMetricsPageStateProps &
  BinaryMetricsPageDispatchProps;

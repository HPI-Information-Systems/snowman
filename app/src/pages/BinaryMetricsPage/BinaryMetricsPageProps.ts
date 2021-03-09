import { Metric } from 'api';
import { TuplesLoader } from 'components/DataViewer/TuplesLoader';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';

export interface BinaryMetricsPageDispatchProps {
  loadMetrics(): void;
  preloadTuplesCounts(): void;
  selectPane(aMetricsTuplesCategory: MetricsTuplesCategories): void;
}

export interface BinaryMetricsPageStateProps {
  tuplesCount: number;
  metrics: Metric[];
  selectedMetricsTuplesCategory: MetricsTuplesCategories;
  metricsTuplesCategories: MetricsTuplesCategories[];
  tuplesLoader: TuplesLoader;
}

export type BinaryMetricsPageProps = BinaryMetricsPageStateProps &
  BinaryMetricsPageDispatchProps;

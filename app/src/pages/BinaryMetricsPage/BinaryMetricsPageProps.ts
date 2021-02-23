import { Metric } from 'api';
import { ColumnDescriptor } from 'components/DataViewer/ColumnDescriptor';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';

export interface BinaryMetricsPageStateProps {
  loadMetrics(): void;
  loadTuples(): void;
  selectPane(aMetricsTuplesCategory: MetricsTuplesCategories): void;
}

export interface BinaryMetricsDispatchProps {
  metrics: Metric[];
  selectedMetricsTuplesCategory: MetricsTuplesCategories;
  metricsTuplesCategories: MetricsTuplesCategories[];
  dataViewerHeader: ColumnDescriptor[];
  dataViewerTuples: unknown[];
}

export type BinaryMetricsPageProps = BinaryMetricsPageStateProps &
  BinaryMetricsDispatchProps;

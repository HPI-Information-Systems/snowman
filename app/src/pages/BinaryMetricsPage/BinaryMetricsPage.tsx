import { ExperimentIntersection } from 'api';
import { ColumnDescriptor } from 'components/DataViewer/ColumnDescriptor';
import { BinaryMetricsPageView } from 'pages/BinaryMetricsPage/BinaryMetricsPage.View';
import {
  BinaryMetricsDispatchProps,
  BinaryMetricsPageStateProps,
} from 'pages/BinaryMetricsPage/BinaryMetricsPageProps';
import { connect } from 'react-redux';
import {
  clickOnPane,
  loadBinaryMetricsTuples,
  loadMetrics,
} from 'store/actions/MetricsStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { MetricsStore, Store } from 'store/models';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';

const getTuplesByTuplesCategory = (
  store: MetricsStore,
  aMetricsTuplesCategory: MetricsTuplesCategories
): ExperimentIntersection | undefined => {
  switch (aMetricsTuplesCategory) {
    case MetricsTuplesCategories.truePositives:
      return store.truePositives;
    case MetricsTuplesCategories.falseNegatives:
      return store.falseNegatives;
    case MetricsTuplesCategories.falsePositives:
      return store.falsePositives;
  }
};

const mapStateToProps = (state: Store): BinaryMetricsDispatchProps => ({
  metrics: state.MetricsStore.metrics,
  metricsTuplesCategories: [
    MetricsTuplesCategories.falseNegatives,
    MetricsTuplesCategories.falsePositives,
    MetricsTuplesCategories.truePositives,
  ],
  selectedMetricsTuplesCategory: state.MetricsStore.selectedDataView,
  dataViewerTuples: ((): unknown[] => {
    const tuples = getTuplesByTuplesCategory(
      state.MetricsStore,
      state.MetricsStore.selectedDataView
    );
    if (tuples !== undefined) {
      const { header, data: rows } = tuples;
      return rows.map((row) => {
        const rowObject: Record<string, string> = {};
        row.forEach((value: string, index: number): void => {
          rowObject[header[index]] = value;
        });
        return rowObject;
      });
    }
    return [];
  })(),
  dataViewerHeader: (
    getTuplesByTuplesCategory(
      state.MetricsStore,
      state.MetricsStore.selectedDataView
    )?.header ?? []
  ).map(
    (aTitle: string): ColumnDescriptor => ({
      label: aTitle,
      objKey: aTitle,
    })
  ),
  confusionMatrix: {
    totalCount: Math.pow(
      state.DatasetsStore.selectedDataset?.numberOfRecords ?? 0,
      2
    ),
    // Todo: Replace with API value in later PR
    falseNegatives: state.MetricsStore.falseNegatives?.data.length,
    // Todo: Replace with API value in later PR
    falsePositives: state.MetricsStore.falsePositives?.data.length,
    // Todo: Replace with API value in later PR
    trueNegatives:
      state.MetricsStore.falseNegatives !== undefined &&
      state.MetricsStore.falsePositives !== undefined &&
      state.MetricsStore.truePositives?.data.length !== undefined
        ? Math.pow(
            state.DatasetsStore.selectedDataset?.numberOfRecords ?? 0,
            2
          ) -
          ((state.MetricsStore.falseNegatives?.data.length ?? 0) +
            (state.MetricsStore.falsePositives?.data.length ?? 0) +
            (state.MetricsStore.truePositives?.data.length ?? 0))
        : undefined,
    // Todo: Replace with API value in later PR
    truePositives: state.MetricsStore.truePositives?.data.length, // incorrect value
  },
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): BinaryMetricsPageStateProps => ({
  loadMetrics() {
    dispatch(loadMetrics()).then();
  },
  loadTuples() {
    dispatch(loadBinaryMetricsTuples()).then();
  },
  selectPane(aMetricsTuplesCategory: MetricsTuplesCategories) {
    dispatch(clickOnPane(aMetricsTuplesCategory));
  },
});

const BinaryMetricsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(BinaryMetricsPageView);

export default BinaryMetricsPage;

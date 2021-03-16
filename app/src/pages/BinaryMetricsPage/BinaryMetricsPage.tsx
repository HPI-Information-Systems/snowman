import { ExperimentIntersection } from 'api';
import { ColumnDescriptor } from 'components/DataViewer/ColumnDescriptor';
import { BinaryMetricsPageView } from 'pages/BinaryMetricsPage/BinaryMetricsPage.View';
import {
  BinaryMetricsPageDispatchProps,
  BinaryMetricsPageStateProps,
} from 'pages/BinaryMetricsPage/BinaryMetricsPageProps';
import { connect } from 'react-redux';
import {
  clickOnPane,
  loadBinaryMetricsTuples,
  loadMetrics,
} from 'store/actions/BinaryMetricsStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { BinaryMetricsStore, Store } from 'store/models';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';

const getTuplesByTuplesCategory = (
  store: BinaryMetricsStore,
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

const mapStateToProps = (state: Store): BinaryMetricsPageStateProps => ({
  metrics: state.BinaryMetricsStore.metrics,
  metricsTuplesCategories: [
    MetricsTuplesCategories.falseNegatives,
    MetricsTuplesCategories.falsePositives,
    MetricsTuplesCategories.truePositives,
  ],
  selectedMetricsTuplesCategory: state.BinaryMetricsStore.selectedDataView,
  dataViewerTuples: ((): unknown[] => {
    const tuples = getTuplesByTuplesCategory(
      state.BinaryMetricsStore,
      state.BinaryMetricsStore.selectedDataView
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
      state.BinaryMetricsStore,
      state.BinaryMetricsStore.selectedDataView
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
    falseNegatives: state.BinaryMetricsStore.falseNegatives?.data.length,
    // Todo: Replace with API value in later PR
    falsePositives: state.BinaryMetricsStore.falsePositives?.data.length,
    // Todo: Replace with API value in later PR
    trueNegatives:
      state.BinaryMetricsStore.falseNegatives !== undefined &&
      state.BinaryMetricsStore.falsePositives !== undefined &&
      state.BinaryMetricsStore.truePositives?.data.length !== undefined
        ? Math.pow(
            state.DatasetsStore.selectedDataset?.numberOfRecords ?? 0,
            2
          ) -
          ((state.BinaryMetricsStore.falseNegatives?.data.length ?? 0) +
            (state.BinaryMetricsStore.falsePositives?.data.length ?? 0) +
            (state.BinaryMetricsStore.truePositives?.data.length ?? 0))
        : undefined,
    // Todo: Replace with API value in later PR
    truePositives: state.BinaryMetricsStore.truePositives?.data.length, // incorrect value
  },
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): BinaryMetricsPageDispatchProps => ({
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

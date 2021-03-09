import { TuplesLoader } from 'components/DataViewer/TuplesLoader';
import { BinaryMetricsPageView } from 'pages/BinaryMetricsPage/BinaryMetricsPage.View';
import {
  BinaryMetricsPageDispatchProps,
  BinaryMetricsPageStateProps,
} from 'pages/BinaryMetricsPage/BinaryMetricsPageProps';
import { connect } from 'react-redux';
import {
  clickOnPane,
  loadBinaryMetricsTuplesCounts,
  loadFalseNegatives,
  loadFalsePositives,
  loadMetrics,
  loadTruePositives,
} from 'store/actions/MetricsStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { MetricsStore, Store } from 'store/models';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';

const getTuplesCountByTuplesCategory = (
  store: MetricsStore,
  aMetricsTuplesCategory: MetricsTuplesCategories
): number => {
  switch (aMetricsTuplesCategory) {
    case MetricsTuplesCategories.truePositives:
      return store.truePositivesCount;
    case MetricsTuplesCategories.falseNegatives:
      return store.falseNegativesCount;
    case MetricsTuplesCategories.falsePositives:
      return store.falsePositivesCount;
  }
};

const getTuplesLoaderByTuplesCategory = (
  aMetricsTuplesCategory: MetricsTuplesCategories
): TuplesLoader => {
  switch (aMetricsTuplesCategory) {
    case MetricsTuplesCategories.falsePositives:
      return loadFalsePositives;
    case MetricsTuplesCategories.truePositives:
      return loadTruePositives;
    case MetricsTuplesCategories.falseNegatives:
      return loadFalseNegatives;
  }
};

const mapStateToProps = (state: Store): BinaryMetricsPageStateProps => ({
  metrics: state.MetricsStore.metrics,
  metricsTuplesCategories: [
    MetricsTuplesCategories.falseNegatives,
    MetricsTuplesCategories.falsePositives,
    MetricsTuplesCategories.truePositives,
  ],
  selectedMetricsTuplesCategory: state.MetricsStore.selectedDataView,
  tuplesCount: getTuplesCountByTuplesCategory(
    state.MetricsStore,
    state.MetricsStore.selectedDataView
  ),
  tuplesLoader: getTuplesLoaderByTuplesCategory(
    state.MetricsStore.selectedDataView
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
): BinaryMetricsPageDispatchProps => ({
  loadMetrics() {
    dispatch(loadMetrics()).then();
  },
  preloadTuplesCounts() {
    dispatch(loadBinaryMetricsTuplesCounts()).then();
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

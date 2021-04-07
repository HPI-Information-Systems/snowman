import { ExperimentIntersectionPairCountsItem } from 'api';
import { BinaryMetricsPageView } from 'pages/BinaryMetricsPage/BinaryMetricsPage.View';
import {
  BinaryMetricsPageDispatchProps,
  BinaryMetricsPageStateProps,
} from 'pages/BinaryMetricsPage/BinaryMetricsPageProps';
import { connect } from 'react-redux';
import {
  clickOnPane,
  getExperiment1,
  getExperiment1Id,
  loadBinaryMetricsTuplesCounts,
  loadFalseNegatives,
  loadFalsePositives,
  loadMetrics,
  loadTrueNegatives,
  loadTruePositives,
} from 'store/actions/BinaryMetricsStoreActions';
import {
  getGroundTruth,
  getGroundTruthId,
} from 'store/actions/CommonMetricsActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';
import { TuplesLoader } from 'types/TuplesLoader';
import { intersectionDescription } from 'utils/intersectionDescription';

const getCountsByTuplesCategory = (
  store: Store,
  aMetricsTuplesCategory: MetricsTuplesCategories
): ExperimentIntersectionPairCountsItem | undefined => {
  const counts = store.BinaryMetricsStore.counts
    .filter(({ experiments }) => experiments.length === 2)
    .filter(({ experiments }) =>
      experiments
        .map(({ experimentId }) => experimentId)
        .includes(getGroundTruthId(store))
    )
    .filter(({ experiments }) =>
      experiments
        .map(({ experimentId }) => experimentId)
        .includes(getExperiment1Id(store))
    );
  switch (aMetricsTuplesCategory) {
    case MetricsTuplesCategories.truePositives:
      return counts.find(({ experiments }) =>
        experiments.every(({ predictedCondition }) => predictedCondition)
      );
    case MetricsTuplesCategories.falseNegatives:
      return counts.find(({ experiments }) =>
        experiments.every(({ predictedCondition, experimentId }) =>
          getGroundTruthId(store) === experimentId
            ? predictedCondition
            : !predictedCondition
        )
      );
    case MetricsTuplesCategories.falsePositives:
      return counts.find(({ experiments }) =>
        experiments.every(({ predictedCondition, experimentId }) =>
          getExperiment1Id(store) === experimentId
            ? predictedCondition
            : !predictedCondition
        )
      );
    case MetricsTuplesCategories.trueNegatives:
      return counts.find(({ experiments }) =>
        experiments.every(({ predictedCondition }) => !predictedCondition)
      );
  }
};
const getPairCountByTuplesCategory = (
  store: Store,
  aMetricsTuplesCategory: MetricsTuplesCategories
): number => {
  return (
    getCountsByTuplesCategory(store, aMetricsTuplesCategory)?.numberPairs ?? 0
  );
};
const getRowCountByTuplesCategory = (
  store: Store,
  aMetricsTuplesCategory: MetricsTuplesCategories
): number => {
  return (
    getCountsByTuplesCategory(store, aMetricsTuplesCategory)?.numberRows ?? 0
  );
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
    case MetricsTuplesCategories.trueNegatives:
      return loadTrueNegatives;
  }
};

const mapStateToProps = (state: Store): BinaryMetricsPageStateProps => ({
  metrics: state.BinaryMetricsStore.metrics,
  metricsTuplesCategories: [
    MetricsTuplesCategories.truePositives,
    MetricsTuplesCategories.falsePositives,
    MetricsTuplesCategories.falseNegatives,
    MetricsTuplesCategories.trueNegatives,
  ],
  selectedMetricsTuplesCategory: state.BinaryMetricsStore.selectedDataView,
  rowCount: getRowCountByTuplesCategory(
    state,
    state.BinaryMetricsStore.selectedDataView
  ),
  tuplesLoader: getTuplesLoaderByTuplesCategory(
    state.BinaryMetricsStore.selectedDataView
  ),
  confusionMatrix: {
    totalCount: Math.pow(
      state.BenchmarkConfigurationStore.selectedDataset?.numberOfRecords ?? 0,
      2
    ),
    falseNegatives: getPairCountByTuplesCategory(
      state,
      MetricsTuplesCategories.falseNegatives
    ),
    falsePositives: getPairCountByTuplesCategory(
      state,
      MetricsTuplesCategories.falsePositives
    ),
    trueNegatives: getPairCountByTuplesCategory(
      state,
      MetricsTuplesCategories.trueNegatives
    ),
    truePositives: getPairCountByTuplesCategory(
      state,
      MetricsTuplesCategories.truePositives
    ),
  },
  dataViewerTitle: intersectionDescription(
    state.BinaryMetricsStore.selectedDataView ===
      MetricsTuplesCategories.truePositives
      ? {
          included: [getExperiment1(state).name, getGroundTruth(state).name],
        }
      : state.BinaryMetricsStore.selectedDataView ===
        MetricsTuplesCategories.falsePositives
      ? {
          included: [getExperiment1(state).name],
          excluded: [getGroundTruth(state).name],
        }
      : state.BinaryMetricsStore.selectedDataView ===
        MetricsTuplesCategories.falseNegatives
      ? {
          excluded: [getExperiment1(state).name],
          included: [getGroundTruth(state).name],
        }
      : {
          excluded: [getExperiment1(state).name, getGroundTruth(state).name],
        }
  ),
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

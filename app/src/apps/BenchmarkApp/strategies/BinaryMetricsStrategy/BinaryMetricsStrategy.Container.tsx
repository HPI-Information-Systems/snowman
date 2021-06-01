import { ExperimentIntersectionCount } from 'api';
import BinaryMetricsStrategyView from 'apps/BenchmarkApp/strategies/BinaryMetricsStrategy/BinaryMetricsStrategy.View';
import {
  BinaryMetricsStrategyDispatchProps,
  BinaryMetricsStrategyStateProps,
} from 'apps/BenchmarkApp/strategies/BinaryMetricsStrategy/BinaryMetricsStrategyProps';
import {
  clickOnPane,
  loadFalseNegatives,
  loadFalsePositives,
  loadTrueNegatives,
  loadTruePositives,
} from 'apps/BenchmarkApp/strategies/BinaryMetricsStrategy/store/BinaryMetricsStrategyActions';
import { BinaryMetricsStrategyModel } from 'apps/BenchmarkApp/strategies/BinaryMetricsStrategy/types/BinaryMetricsStrategyModel';
import { connect } from 'react-redux';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { TuplesLoader } from 'types/TuplesLoader';
import {
  intersectionDescription,
  intersectionFileName,
} from 'utils/intersectionHelpers';
import { numberOfDistinctPairs } from 'utils/numberOfDistinctPairs';
import { dummyTuplesLoader } from 'utils/tuplesLoaders';

const getCountsByTuplesCategory = (
  store: BinaryMetricsStrategyModel,
  aMetricsTuplesCategory: MetricsTuplesCategories
): ExperimentIntersectionCount | undefined => {
  const experiment = store.experiment;
  const goldStandard = store.groundTruth;
  if (experiment === undefined || goldStandard === undefined) {
    return undefined;
  }
  const counts = store.counts
    .filter(({ experiments }) => experiments.length === 2)
    .filter(({ experiments }) =>
      experiments
        .map(({ experimentId }) => experimentId)
        .includes(experiment.experiment.id)
    )
    .filter(({ experiments }) =>
      experiments
        .map(({ experimentId }) => experimentId)
        .includes(goldStandard.experiment.id)
    );
  switch (aMetricsTuplesCategory) {
    case MetricsTuplesCategories.truePositives:
      return counts.find(({ experiments }) =>
        experiments.every(({ predictedCondition }) => predictedCondition)
      );
    case MetricsTuplesCategories.falseNegatives:
      return counts.find(({ experiments }) =>
        experiments.every(({ predictedCondition, experimentId }) =>
          goldStandard.experiment.id === experimentId
            ? predictedCondition
            : !predictedCondition
        )
      );
    case MetricsTuplesCategories.falsePositives:
      return counts.find(({ experiments }) =>
        experiments.every(({ predictedCondition, experimentId }) =>
          experiment.experiment.id === experimentId
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
  store: BinaryMetricsStrategyModel,
  aMetricsTuplesCategory: MetricsTuplesCategories
): number => {
  return (
    getCountsByTuplesCategory(store, aMetricsTuplesCategory)?.numberPairs ?? 0
  );
};
const getRowCountByTuplesCategory = (
  store: BinaryMetricsStrategyModel,
  aMetricsTuplesCategory: MetricsTuplesCategories
): number => {
  return (
    getCountsByTuplesCategory(store, aMetricsTuplesCategory)?.numberRows ?? 0
  );
};

const getTuplesLoaderByTuplesCategory = (
  state: BinaryMetricsStrategyModel,
  aMetricsTuplesCategory: MetricsTuplesCategories
): TuplesLoader => {
  switch (aMetricsTuplesCategory) {
    case MetricsTuplesCategories.falsePositives:
      return loadFalsePositives(state);
    case MetricsTuplesCategories.truePositives:
      return loadTruePositives(state);
    case MetricsTuplesCategories.falseNegatives:
      return loadFalseNegatives(state);
    case MetricsTuplesCategories.trueNegatives:
      return loadTrueNegatives(state);
  }
};

const executeStateAsIntersectionToString = (
  state: BinaryMetricsStrategyModel,
  toStringFunction: (props: {
    ignored?: string[];
    included?: string[];
    excluded?: string[];
    pairCount?: number;
  }) => string
) =>
  state.experiment !== undefined && state.groundTruth !== undefined
    ? toStringFunction(
        state.selectedDataView === MetricsTuplesCategories.truePositives
          ? {
              included: [
                state.experiment.experiment.name,
                state.groundTruth.experiment.name,
              ],
            }
          : state.selectedDataView === MetricsTuplesCategories.falsePositives
          ? {
              included: [state.experiment.experiment.name],
              excluded: [state.groundTruth.experiment.name],
            }
          : state.selectedDataView === MetricsTuplesCategories.falseNegatives
          ? {
              excluded: [state.experiment.experiment.name],
              included: [state.groundTruth.experiment.name],
            }
          : {
              excluded: [
                state.experiment.experiment.name,
                state.groundTruth.experiment.name,
              ],
            }
      )
    : 'unknown';

const mapStateToProps = (
  state: BinaryMetricsStrategyModel
): BinaryMetricsStrategyStateProps => {
  return {
    metrics: state.metrics,
    metricsTuplesCategories: [
      MetricsTuplesCategories.truePositives,
      MetricsTuplesCategories.falsePositives,
      MetricsTuplesCategories.falseNegatives,
      MetricsTuplesCategories.trueNegatives,
    ],
    selectedMetricsTuplesCategory: state.selectedDataView,
    rowCount: getRowCountByTuplesCategory(state, state.selectedDataView),
    tuplesLoader:
      state.experiment !== undefined && state.groundTruth !== undefined
        ? getTuplesLoaderByTuplesCategory(state, state.selectedDataView)
        : dummyTuplesLoader,
    confusionMatrix: {
      totalCount: numberOfDistinctPairs(state.dataset?.numberOfRecords ?? 0),
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
    dataViewerTitle: executeStateAsIntersectionToString(
      state,
      intersectionDescription
    ),
    dataViewerFileName: executeStateAsIntersectionToString(
      state,
      intersectionFileName
    ),
    isValidConfig: state.isValidConfig,
  };
};

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<BinaryMetricsStrategyModel>
): BinaryMetricsStrategyDispatchProps => ({
  selectPane(aMetricsTuplesCategory: MetricsTuplesCategories) {
    dispatch(clickOnPane(aMetricsTuplesCategory));
  },
});

const BinaryMetricsStrategyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BinaryMetricsStrategyView);

export default BinaryMetricsStrategyContainer;

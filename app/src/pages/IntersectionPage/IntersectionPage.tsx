import { connect } from 'react-redux';
import { Store } from 'store/models';

import {
  BenchmarkApi,
  DatasetsApi,
  ExperimentIntersectionPairCountsExperiments,
} from '../../api';
import { TuplesLoader } from '../../components/DataViewer/TuplesLoader';
import { loadCounts } from '../../store/actions/IntersectionStoreActions';
import { SnowmanDispatch } from '../../store/messages';
import IntersectionPageView from './IntersectionPage.View';
import {
  IntersectionPageDispatchProps,
  IntersectionPageStateProps,
} from './IntersectionPageProps';

function intersectionCountSorter(
  e1: ExperimentIntersectionPairCountsExperiments,
  e2: ExperimentIntersectionPairCountsExperiments
) {
  return e1.experimentId - e2.experimentId;
}

function sortedConfigsMatch(
  config1: ExperimentIntersectionPairCountsExperiments[],
  config2: ExperimentIntersectionPairCountsExperiments[]
) {
  return (
    config1.length === config2.length &&
    config1.every(
      ({ experimentId, predictedCondition }, index) =>
        config2[index].experimentId === experimentId &&
        config2[index].predictedCondition === predictedCondition
    )
  );
}

let lastLoadTuples: TuplesLoader = () => Promise.reject();
let lastSortedConfig: ExperimentIntersectionPairCountsExperiments[] = [];
let lastDataset: number | undefined = undefined;

function getLoadTuples(
  sortedConfig: ExperimentIntersectionPairCountsExperiments[],
  dataset: number | undefined
): TuplesLoader {
  if (
    !sortedConfigsMatch(sortedConfig, lastSortedConfig) ||
    lastDataset !== dataset
  ) {
    lastDataset = dataset;
    lastSortedConfig = sortedConfig;
    if (dataset === undefined) {
      lastLoadTuples = () => Promise.reject();
    } else if (sortedConfig.length > 0) {
      lastLoadTuples = (startAt, stop) =>
        new BenchmarkApi().calculateExperimentIntersectionRecords({
          startAt,
          limit: stop - startAt,
          experimentIntersectionRequestExperiments: sortedConfig,
        });
    } else {
      lastLoadTuples = (startAt, stop) =>
        new DatasetsApi().getDatasetFile({
          datasetId: dataset,
          startAt,
          limit: stop - startAt,
        });
    }
  }
  return lastLoadTuples;
}

function countsLoaded({
  IntersectionStore,
  BenchmarkConfigurationStore,
}: Store) {
  const loadedExperimentIds = new Set(
    IntersectionStore.counts
      .reduce<{
        experiments: ExperimentIntersectionPairCountsExperiments[];
      }>(
        (prev, current) =>
          current.experiments.length > prev.experiments.length ? current : prev,
        { experiments: [] }
      )
      .experiments.map(({ experimentId }) => experimentId)
  );
  return (
    BenchmarkConfigurationStore.chosenExperiments.every(({ id }) =>
      loadedExperimentIds.has(id)
    ) &&
    BenchmarkConfigurationStore.chosenGoldStandards.every(({ id }) =>
      loadedExperimentIds.has(id)
    )
  );
}

const mapStateToProps = (state: Store): IntersectionPageStateProps => {
  const sortedCounts = state.IntersectionStore.counts.map((intersection) => ({
    ...intersection,
    experiments: intersection.experiments.slice().sort(intersectionCountSorter),
  }));
  const sortedConfig = [
    ...state.IntersectionStore.included.map(({ id }) => ({
      experimentId: id,
      predictedCondition: true,
    })),
    ...state.IntersectionStore.excluded.map(({ id }) => ({
      experimentId: id,
      predictedCondition: false,
    })),
  ].sort(intersectionCountSorter);

  const configCounts = sortedCounts.find(({ experiments }) =>
    sortedConfigsMatch(experiments, sortedConfig)
  );

  return {
    loadTuples: getLoadTuples(
      sortedConfig,
      state.BenchmarkConfigurationStore.selectedDataset?.id
    ),
    tuplesCount: configCounts?.numberRows ?? 0,
    pairCount: configCounts?.numberPairs ?? 0,
    includedExperimentNames: state.IntersectionStore.included.map(
      ({ name }) => name
    ),
    excludedExperimentNames: state.IntersectionStore.excluded.map(
      ({ name }) => name
    ),
    countsLoaded: countsLoaded(state),
  };
};

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): IntersectionPageDispatchProps => {
  return {
    loadCounts() {
      return dispatch(loadCounts());
    },
  };
};

const IntersectionPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntersectionPageView);

export default IntersectionPage;

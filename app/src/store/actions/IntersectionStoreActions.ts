import {
  BenchmarkApi,
  CalculateExperimentIntersectionCountsRequest,
  Experiment,
  ExperimentIntersectionCount,
  ExperimentIntersectionItem,
} from 'api';
import { DropResult } from 'react-beautiful-dnd';
import { IntersectionStoreActionTypes as actionTypes } from 'store/actions/actionTypes';
import { datasetTuplesLoader } from 'store/actions/DatasetsPageActions';
import { SnowmanDispatch, SnowmanThunkAction } from 'store/messages';
import { store } from 'store/store';
import { IntersectionBuckets } from 'types/IntersectionBuckets';
import { TuplesLoader } from 'types/TuplesLoader';
import { getDndDescriptorFromDropResult } from 'utils/dragNDropHelpers';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';
import RequestHandler from 'utils/requestHandler';

export const dragNDropAnExperiment = (
  aDropResult: DropResult
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.DRAG_N_DROP_EXPERIMENT,
    payload: getDndDescriptorFromDropResult<IntersectionBuckets>(
      aDropResult,
      IntersectionBuckets.IGNORED
    ),
  });

export const resetIntersection = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.RESET_INTERSECTION,
    payload: false,
  });

export const resetIncludedExperiments = (
  experiments: Experiment[]
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.RESET_INCLUDED_EXPERIMENTS,
    payload: experiments,
  });

export const countsMatchConfiguration = (
  counts: ExperimentIntersectionCount[],
  ...chosenExperiments: Experiment[][]
): boolean => {
  const countsExperimentIds = new Set(
    counts
      .reduce<{
        experiments: ExperimentIntersectionItem[];
      }>(
        (prev, current) =>
          current.experiments.length > prev.experiments.length ? current : prev,
        { experiments: [] }
      )
      .experiments.map(({ experimentId }) => experimentId)
  );
  const flatChosenExperiments = chosenExperiments.flat();
  return (
    flatChosenExperiments.length === countsExperimentIds.size &&
    flatChosenExperiments.every(({ id }) => countsExperimentIds.has(id))
  );
};

export const countsMatchCurrentConfiguration = (
  counts = store.getState().IntersectionStore.counts
): boolean => {
  const { BenchmarkConfigurationStore } = store.getState();
  return countsMatchConfiguration(
    counts,
    BenchmarkConfigurationStore.chosenExperiments,
    BenchmarkConfigurationStore.chosenGoldStandards
  );
};

const loadCountsRequestBody = (): CalculateExperimentIntersectionCountsRequest => {
  const { BenchmarkConfigurationStore } = store.getState();
  return {
    experiments: [
      ...BenchmarkConfigurationStore.chosenExperiments,
      ...BenchmarkConfigurationStore.chosenGoldStandards,
    ].map(({ id }) => ({ experimentId: id })),
  };
};

export const intersectionSorter = (
  e1: ExperimentIntersectionItem,
  e2: ExperimentIntersectionItem
): number => e1.experimentId - e2.experimentId;

export const intersectionsMatch = (
  sortedConfig1: ExperimentIntersectionItem[],
  sortedConfig2: ExperimentIntersectionItem[]
): boolean =>
  sortedConfig1.length === sortedConfig2.length &&
  sortedConfig1.every(
    ({ experimentId, predictedCondition }, index) =>
      sortedConfig2[index].experimentId === experimentId &&
      sortedConfig2[index].predictedCondition === predictedCondition
  );

export const getCountsForIntersection = (
  sortedCounts: ExperimentIntersectionCount[],
  sortedConfig: ExperimentIntersectionItem[]
): ExperimentIntersectionCount | undefined =>
  sortedCounts.find(({ experiments }) =>
    intersectionsMatch(experiments, sortedConfig)
  );

export const loadCounts = (): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> => {
  if (!countsMatchCurrentConfiguration()) {
    const counts = await RequestHandler(() =>
      new BenchmarkApi().calculateExperimentIntersectionCounts(
        loadCountsRequestBody()
      )
    );
    if (
      !countsMatchCurrentConfiguration() &&
      countsMatchCurrentConfiguration(counts)
    ) {
      counts.forEach(({ experiments }) => experiments.sort(intersectionSorter));
      dispatch({
        type: actionTypes.SET_COUNTS,
        payload: counts,
      });
    }
  }
};

const intersectionTuplesLoaders = new Map<string, TuplesLoader>();
const serializeIntersection = (
  sortedConfig: ExperimentIntersectionItem[]
): string =>
  sortedConfig
    .map(
      ({ experimentId, predictedCondition }) =>
        `${experimentId}${predictedCondition ? 'i' : 'e'}`
    )
    .join(':');
export const intersectionTuplesLoader = (
  sortedConfig: ExperimentIntersectionItem[],
  dataset: number
): TuplesLoader => {
  if (sortedConfig.length > 0) {
    const serializedConfig = serializeIntersection(sortedConfig);
    let tuplesLoader = intersectionTuplesLoaders.get(serializedConfig);
    if (!tuplesLoader) {
      tuplesLoader = (startAt, stop) =>
        new BenchmarkApi().calculateExperimentIntersectionRecords({
          startAt,
          limit: stop - startAt,
          intersection: sortedConfig,
        });
      intersectionTuplesLoaders.set(serializedConfig, tuplesLoader);
    }
    return tuplesLoader;
  } else {
    return datasetTuplesLoader(dataset);
  }
};

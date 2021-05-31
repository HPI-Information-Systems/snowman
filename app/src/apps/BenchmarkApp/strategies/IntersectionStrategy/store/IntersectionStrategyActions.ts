import {
  BenchmarkApi,
  CalculateExperimentIntersectionCountsRequest,
  ExperimentConfigItem,
  ExperimentIntersectionCount,
  ExperimentIntersectionItem,
  FileResponseFormat,
} from 'api';
import { IntersectionStrategyActionTypes } from 'apps/BenchmarkApp/strategies/IntersectionStrategy/types/IntersectionStrategyActionTypes';
import { IntersectionStrategyModel } from 'apps/BenchmarkApp/strategies/IntersectionStrategy/types/IntersectionStrategyModel';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import {
  experimentConfigItemsEqual,
  experimentEntityToExperimentConfigItem,
  uniqueExperimentConfigKey,
} from 'apps/BenchmarkApp/utils/experimentEntity';
import { DropResult } from 'react-beautiful-dnd';
import { ExperimentEntity } from 'types/ExperimentEntity';
import { IntersectionBuckets } from 'types/IntersectionBuckets';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';
import { TuplesLoader } from 'types/TuplesLoader';
import { getDndDescriptorFromDropResult } from 'utils/dragNDropHelpers';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';
import { fileRequest } from 'utils/fileRequest';
import RequestHandler from 'utils/requestHandler';
import { datasetTuplesLoader } from 'utils/tuplesLoaders';

export const updateConfig = (
  appStore: BenchmarkAppModel
): easyPrimitiveActionReturn<IntersectionStrategyModel> =>
  easyPrimitiveAction<IntersectionStrategyModel>({
    type: IntersectionStrategyActionTypes.UPDATE_CONFIG,
    payload: appStore,
  });

export const dragNDropAnExperiment = (
  aDropResult: DropResult
): easyPrimitiveActionReturn<IntersectionStrategyModel> =>
  easyPrimitiveAction<IntersectionStrategyModel>({
    type: IntersectionStrategyActionTypes.DRAG_N_DROP_EXPERIMENT,
    payload: getDndDescriptorFromDropResult<IntersectionBuckets>(
      aDropResult,
      IntersectionBuckets.IGNORED
    ),
  });

export const resetIncludedExperiments = (
  experiments: ExperimentEntity[]
): easyPrimitiveActionReturn<IntersectionStrategyModel> =>
  easyPrimitiveAction<IntersectionStrategyModel>({
    type: IntersectionStrategyActionTypes.RESET_INCLUDED_EXPERIMENTS,
    payload: experiments,
  });

export const countsMatchConfiguration = (
  counts: ExperimentIntersectionCount[],
  ...chosenExperiments: ExperimentEntity[][]
): boolean => {
  const countsExperiments = counts.reduce<{
    experiments: ExperimentIntersectionItem[];
  }>(
    (prev, current) =>
      current.experiments.length > prev.experiments.length ? current : prev,
    { experiments: [] }
  ).experiments;
  const flatChosenExperiments = chosenExperiments.flat();
  return (
    flatChosenExperiments.length === countsExperiments.length &&
    flatChosenExperiments.every(({ experiment, similarity: sim }) =>
      countsExperiments.find(
        ({ experimentId, similarity: sim2 }) =>
          experiment.id === experimentId &&
          sim?.func.id === sim2?.func &&
          sim?.threshold === sim2?.threshold
      )
    )
  );
};

export const countsMatchCurrentConfiguration = (
  state: IntersectionStrategyModel,
  counts = state.counts
): boolean => {
  return countsMatchConfiguration(counts, state.available);
};

const loadCountsRequestBody = (
  state: IntersectionStrategyModel
): CalculateExperimentIntersectionCountsRequest => {
  return {
    experiments: state.available.map((entity) =>
      experimentEntityToExperimentConfigItem(entity)
    ),
  };
};

export const intersectionSorter = (
  e1: ExperimentConfigItem,
  e2: ExperimentConfigItem
): number =>
  e1.experimentId - e2.experimentId ||
  (e1.similarity?.func ?? 0) - (e2.similarity?.func ?? 0) ||
  (e1.similarity?.threshold ?? 0) - (e2.similarity?.threshold ?? 0);

export const intersectionsMatch = (
  sortedConfig1: ExperimentIntersectionItem[],
  sortedConfig2: ExperimentIntersectionItem[]
): boolean =>
  sortedConfig1.length === sortedConfig2.length &&
  sortedConfig1.every(
    ({ predictedCondition, ...config }, index) =>
      experimentConfigItemsEqual(config, sortedConfig2[index]) &&
      sortedConfig2[index].predictedCondition === predictedCondition
  );

export const getCountsForIntersection = (
  sortedCounts: ExperimentIntersectionCount[],
  sortedConfig: ExperimentIntersectionItem[]
): ExperimentIntersectionCount | undefined =>
  sortedCounts.find(({ experiments }) =>
    intersectionsMatch(experiments, sortedConfig)
  );

export const loadCounts = (): SnowmanThunkAction<
  Promise<void>,
  IntersectionStrategyModel
> => async (
  dispatch: SnowmanDispatch<IntersectionStrategyModel>,
  getState: () => IntersectionStrategyModel
): Promise<void> => {
  if (
    !countsMatchCurrentConfiguration(getState()) &&
    getState().isValidConfig
  ) {
    const counts = await RequestHandler(() =>
      new BenchmarkApi().calculateExperimentIntersectionCounts(
        loadCountsRequestBody(getState())
      )
    );
    if (
      !countsMatchCurrentConfiguration(getState()) &&
      countsMatchCurrentConfiguration(getState(), counts)
    ) {
      counts.forEach(({ experiments }) => experiments.sort(intersectionSorter));
      dispatch({
        type: IntersectionStrategyActionTypes.SET_COUNTS,
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
      ({ predictedCondition, ...config }) =>
        `${uniqueExperimentConfigKey(config)}${predictedCondition ? 'i' : 'e'}`
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
        fileRequest(BenchmarkApi, 'calculateExperimentIntersectionRecords', {
          startAt,
          limit: stop - startAt,
          intersection: sortedConfig,
          format: FileResponseFormat.Json,
        });
      intersectionTuplesLoaders.set(serializedConfig, tuplesLoader);
    }
    return tuplesLoader;
  } else {
    return datasetTuplesLoader(dataset);
  }
};

export const loadStrategyData = (
  dispatch: SnowmanDispatch<IntersectionStrategyModel>,
  appStore: BenchmarkAppModel
): void => {
  dispatch(updateConfig(appStore));
  dispatch(loadCounts()).then();
};

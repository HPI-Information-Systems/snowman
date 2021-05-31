import {
  BenchmarkApi,
  CalculateExperimentIntersectionRecordsRequest,
  ExperimentConfigItem,
  ExperimentIntersectionCount,
  Metric,
} from 'api';
import { BinaryMetricsStrategyActionTypes } from 'apps/BenchmarkApp/strategies/BinaryMetricsStrategy/types/BinaryMetricsStrategyActionTypes';
import { BinaryMetricsStrategyModel } from 'apps/BenchmarkApp/strategies/BinaryMetricsStrategy/types/BinaryMetricsStrategyModel';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { experimentEntityToExperimentConfigItem } from 'apps/BenchmarkApp/utils/experimentEntity';
import { MagicNotPossibleId } from 'structs/constants';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';
import { TuplesLoader } from 'types/TuplesLoader';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';
import RequestHandler from 'utils/requestHandler';
import { createTuplesLoader } from 'utils/tuplesLoaders';

export const updateConfig = (
  benchmarkConfig: BenchmarkAppModel
): easyPrimitiveActionReturn<BinaryMetricsStrategyModel> =>
  easyPrimitiveAction<BinaryMetricsStrategyModel>({
    type: BinaryMetricsStrategyActionTypes.UPDATE_CONFIG,
    payload: benchmarkConfig,
  });

export const loadMetrics = (): SnowmanThunkAction<
  Promise<void>,
  BinaryMetricsStrategyModel
> => async (
  dispatch: SnowmanDispatch<BinaryMetricsStrategyModel>,
  getState: () => BinaryMetricsStrategyModel
): Promise<void> => {
  dispatch(resetMetrics());
  if (getState().isValidConfig)
    dispatch(() =>
      RequestHandler<Metric[]>(() =>
        new BenchmarkApi().getBinaryMetrics({
          groundTruthSimilarityThresholdFunction: getState().groundTruth
            ?.similarity?.func.id,
          groundTruthSimilarityThreshold: getState().groundTruth?.similarity
            ?.threshold,
          groundTruthExperimentId:
            getState().groundTruth?.experiment.id ?? MagicNotPossibleId,
          predictedSimilarityThresholdFunction: getState().experiment
            ?.similarity?.func.id,
          predictedSimilarityThreshold: getState().experiment?.similarity
            ?.threshold,
          predictedExperimentId:
            getState().experiment?.experiment.id ?? MagicNotPossibleId,
        })
      )
    ).then((response: Metric[]) => dispatch(setAllMetrics(response)));
};

const getRequestBodyForTruePositives = (
  experimentConfig1: ExperimentConfigItem,
  experimentConfig2: ExperimentConfigItem
): CalculateExperimentIntersectionRecordsRequest['intersection'] => [
  {
    ...experimentConfig1,
    predictedCondition: true,
  },
  {
    ...experimentConfig2,
    predictedCondition: true,
  },
];

const getRequestBodyForFalsePositives = (
  experimentConfig1: ExperimentConfigItem,
  experimentConfig2: ExperimentConfigItem
): CalculateExperimentIntersectionRecordsRequest['intersection'] => [
  {
    ...experimentConfig1,
    predictedCondition: false,
  },
  {
    ...experimentConfig2,
    predictedCondition: true,
  },
];

const getRequestBodyForFalseNegatives = (
  experimentConfig1: ExperimentConfigItem,
  experimentConfig2: ExperimentConfigItem
): CalculateExperimentIntersectionRecordsRequest['intersection'] => [
  {
    ...experimentConfig1,
    predictedCondition: true,
  },
  {
    ...experimentConfig2,
    predictedCondition: false,
  },
];

const getRequestBodyForTrueNegatives = (
  experimentConfig1: ExperimentConfigItem,
  experimentConfig2: ExperimentConfigItem
): CalculateExperimentIntersectionRecordsRequest['intersection'] => [
  {
    ...experimentConfig1,
    predictedCondition: false,
  },
  {
    ...experimentConfig2,
    predictedCondition: false,
  },
];

type LoadTuplesRequestBody = ReturnType<typeof getRequestBodyForTruePositives>;

const getExperimentsComparisonTuple = (
  state: BinaryMetricsStrategyModel
): [ExperimentConfigItem, ExperimentConfigItem] => [
  state.groundTruth === undefined
    ? { experimentId: MagicNotPossibleId }
    : experimentEntityToExperimentConfigItem(state.groundTruth),
  state.experiment === undefined
    ? { experimentId: MagicNotPossibleId }
    : experimentEntityToExperimentConfigItem(state.experiment),
];

const createBinaryMetricsTuplesLoader = (
  intersection: LoadTuplesRequestBody
): TuplesLoader =>
  createTuplesLoader(BenchmarkApi, 'calculateExperimentIntersectionRecords', {
    intersection,
  });

export const loadTruePositives = (
  state: BinaryMetricsStrategyModel
): TuplesLoader =>
  createBinaryMetricsTuplesLoader(
    getRequestBodyForTruePositives(...getExperimentsComparisonTuple(state))
  );

export const loadFalsePositives = (
  state: BinaryMetricsStrategyModel
): TuplesLoader =>
  createBinaryMetricsTuplesLoader(
    getRequestBodyForFalsePositives(...getExperimentsComparisonTuple(state))
  );

export const loadFalseNegatives = (
  state: BinaryMetricsStrategyModel
): TuplesLoader =>
  createBinaryMetricsTuplesLoader(
    getRequestBodyForFalseNegatives(...getExperimentsComparisonTuple(state))
  );

export const loadTrueNegatives = (
  state: BinaryMetricsStrategyModel
): TuplesLoader =>
  createBinaryMetricsTuplesLoader(
    getRequestBodyForTrueNegatives(...getExperimentsComparisonTuple(state))
  );

export const loadBinaryMetricsTuplesCounts = (): SnowmanThunkAction<
  Promise<void>,
  BinaryMetricsStrategyModel
> => async (
  dispatch: SnowmanDispatch<BinaryMetricsStrategyModel>,
  getState: () => BinaryMetricsStrategyModel
): Promise<void> => {
  if (!getState().isValidConfig) return Promise.resolve();
  return RequestHandler(() =>
    new BenchmarkApi()
      .calculateExperimentIntersectionCounts({
        experiments: getExperimentsComparisonTuple(getState()),
      })
      .then((counts) => dispatch(setAllCounts(counts)))
  );
};

export const clickOnPane = (
  aPaneName: MetricsTuplesCategories
): easyPrimitiveActionReturn<BinaryMetricsStrategyModel> =>
  easyPrimitiveAction<BinaryMetricsStrategyModel>({
    type: BinaryMetricsStrategyActionTypes.CLICK_ON_PANE,
    payload: aPaneName,
  });

export const resetMetrics = (): easyPrimitiveActionReturn<BinaryMetricsStrategyModel> =>
  easyPrimitiveAction<BinaryMetricsStrategyModel>({
    type: BinaryMetricsStrategyActionTypes.RESET_METRICS,
    // reducer ignores payload
    payload: false,
  });

export const setAllMetrics = (
  allMetrics: Metric[]
): easyPrimitiveActionReturn<BinaryMetricsStrategyModel> =>
  easyPrimitiveAction<BinaryMetricsStrategyModel>({
    type: BinaryMetricsStrategyActionTypes.SET_ALL_METRICS,
    payload: allMetrics,
  });

export const setAllCounts = (
  allCounts: ExperimentIntersectionCount[]
): easyPrimitiveActionReturn<BinaryMetricsStrategyModel> =>
  easyPrimitiveAction<BinaryMetricsStrategyModel>({
    type: BinaryMetricsStrategyActionTypes.SET_ALL_COUNTS,
    payload: allCounts,
  });

export const loadStrategyData = (
  dispatch: SnowmanDispatch<BinaryMetricsStrategyModel>,
  appStore: BenchmarkAppModel
): void => {
  dispatch(updateConfig(appStore));
  dispatch(loadMetrics()).then();
  dispatch(loadBinaryMetricsTuplesCounts()).then();
};

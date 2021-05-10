import {
  BenchmarkApi,
  CalculateExperimentIntersectionRecordsRequest,
  ExperimentConfigItem,
  ExperimentIntersectionCount,
  FileResponse,
  Metric,
} from 'api';
import { BinaryMetricsStrategyActionTypes } from 'apps/BenchmarkApp/strategies/BinaryMetricsStrategy/types/BinaryMetricsStrategyActionTypes';
import { BinaryMetricsStrategyModel } from 'apps/BenchmarkApp/strategies/BinaryMetricsStrategy/types/BinaryMetricsStrategyModel';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { MagicNotPossibleId } from 'structs/constants';
import { SUCCESS_LOAD_BINARY_METRICS } from 'structs/statusMessages';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';
import RequestHandler from 'utils/requestHandler';

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
      RequestHandler<Metric[]>(
        () =>
          new BenchmarkApi().getBinaryMetrics({
            groundTruthExperimentId:
              getState().groundTruth?.id ?? MagicNotPossibleId,
            predictedExperimentId:
              getState().experiment?.id ?? MagicNotPossibleId,
          }),
        SUCCESS_LOAD_BINARY_METRICS
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
  { experimentId: state.groundTruth?.id ?? MagicNotPossibleId },
  { experimentId: state.experiment?.id ?? MagicNotPossibleId },
];

const loadTuples = (
  intersection: LoadTuplesRequestBody,
  startAt: number,
  stopAt: number
): Promise<FileResponse> =>
  new BenchmarkApi().calculateExperimentIntersectionRecords({
    intersection,
    startAt,
    limit: stopAt - startAt,
  });

export const loadTruePositives = (state: BinaryMetricsStrategyModel) => (
  startIndex: number,
  stopIndex: number
): Promise<FileResponse> =>
  loadTuples(
    getRequestBodyForTruePositives(...getExperimentsComparisonTuple(state)),
    startIndex,
    stopIndex
  );

export const loadFalsePositives = (state: BinaryMetricsStrategyModel) => (
  startIndex: number,
  stopIndex: number
): Promise<FileResponse> =>
  loadTuples(
    getRequestBodyForFalsePositives(...getExperimentsComparisonTuple(state)),
    startIndex,
    stopIndex
  );

export const loadFalseNegatives = (state: BinaryMetricsStrategyModel) => (
  startIndex: number,
  stopIndex: number
): Promise<FileResponse> =>
  loadTuples(
    getRequestBodyForFalseNegatives(...getExperimentsComparisonTuple(state)),
    startIndex,
    stopIndex
  );

export const loadTrueNegatives = (state: BinaryMetricsStrategyModel) => (
  startIndex: number,
  stopIndex: number
): Promise<FileResponse> =>
  loadTuples(
    getRequestBodyForTrueNegatives(...getExperimentsComparisonTuple(state)),
    startIndex,
    stopIndex
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
      .then()
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
  // Todo: Load smth
};

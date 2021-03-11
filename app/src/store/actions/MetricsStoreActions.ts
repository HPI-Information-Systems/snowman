import {
  BenchmarkApi,
  ExperimentIntersection,
  ExperimentIntersectionCount,
  Metric,
} from 'api';
import { MetricsStoreActionTypes as actionTypes } from 'store/actions/actionTypes';
import {
  SnowmanAction,
  SnowmanDispatch,
  SnowmanThunkAction,
} from 'store/messages';
import { store } from 'store/store';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';
import RequestHandler from 'utils/requestHandler';
import { SUCCESS_LOAD_BINARY_METRICS } from 'utils/statusMessages';

const getGroundTruthId = (): number => {
  const selectedExperiments = store.getState().ExperimentsStore
    .selectedExperiments;
  return selectedExperiments[0];
};

const getExperiment1Id = (): number => {
  const selectedExperiments = store.getState().ExperimentsStore
    .selectedExperiments;
  return selectedExperiments[1];
};

export const loadMetrics = (): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> => {
  dispatch(resetMetrics());
  return RequestHandler(
    () =>
      new BenchmarkApi()
        .getBinaryMetrics({
          experimentId1: getGroundTruthId(),
          experimentId2: getExperiment1Id(),
        })
        .then(
          (response: Metric[]): SnowmanAction =>
            dispatch({
              type: actionTypes.SET_ALL_METRICS,
              payload: response,
            })
        )
        .then(),
    dispatch,
    SUCCESS_LOAD_BINARY_METRICS
  );
};

const getRequestBodyForTruePositives = (
  experimentId1: number,
  experimentId2: number
) => ({
  experimentIntersectionRequestExperiments: [
    {
      experimentId: experimentId1,
      predictedCondition: true,
    },
    {
      experimentId: experimentId2,
      predictedCondition: true,
    },
  ],
});

const getRequestBodyForFalsePositives = (
  experimentId1: number,
  experimentId2: number
) => ({
  experimentIntersectionRequestExperiments: [
    {
      experimentId: experimentId1,
      predictedCondition: false,
    },
    {
      experimentId: experimentId2,
      predictedCondition: true,
    },
  ],
});

const getRequestBodyForFalseNegatives = (
  experimentId1: number,
  experimentId2: number
) => ({
  experimentIntersectionRequestExperiments: [
    {
      experimentId: experimentId1,
      predictedCondition: true,
    },
    {
      experimentId: experimentId2,
      predictedCondition: false,
    },
  ],
});

type LoadTuplesRequestBody = ReturnType<typeof getRequestBodyForTruePositives>;

const getExperimentsComparisonTuple = (): [number, number] => [
  getGroundTruthId(),
  getExperiment1Id(),
];

const loadTuples = (
  requestBody: LoadTuplesRequestBody,
  startAt: number,
  stopAt: number
): SnowmanThunkAction<Promise<ExperimentIntersection>> => async (
  dispatch: SnowmanDispatch
): Promise<ExperimentIntersection> =>
  RequestHandler<ExperimentIntersection>(
    (): Promise<ExperimentIntersection> =>
      new BenchmarkApi().calculateExperimentIntersectionRecords({
        ...requestBody,
        startAt: startAt,
        limit: stopAt - startAt,
      }),
    dispatch
  );

const loadTuplesCountOf = (
  requestBody: LoadTuplesRequestBody,
  saveActionType: string
): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> =>
  RequestHandler<ExperimentIntersectionCount>(
    (): Promise<ExperimentIntersectionCount> =>
      new BenchmarkApi().calculateExperimentIntersectionCount(requestBody),
    dispatch
  )
    .then(
      (response: ExperimentIntersectionCount): number => response.numberRows
    )
    .then((count: number): void => {
      dispatch({
        type: saveActionType,
        payload: count,
      });
    });

export const loadTruePositives = (
  startIndex: number,
  stopIndex: number
): SnowmanThunkAction<Promise<ExperimentIntersection>> =>
  loadTuples(
    getRequestBodyForTruePositives(...getExperimentsComparisonTuple()),
    startIndex,
    stopIndex
  );

const loadTruePositivesCount = (): SnowmanThunkAction<Promise<void>> =>
  loadTuplesCountOf(
    getRequestBodyForTruePositives(...getExperimentsComparisonTuple()),
    actionTypes.SET_TRUE_POSITIVES_COUNT
  );

export const loadFalsePositives = (
  startIndex: number,
  stopIndex: number
): SnowmanThunkAction<Promise<ExperimentIntersection>> =>
  loadTuples(
    getRequestBodyForFalsePositives(...getExperimentsComparisonTuple()),
    startIndex,
    stopIndex
  );

const loadFalsePositivesCount = (): SnowmanThunkAction<Promise<void>> =>
  loadTuplesCountOf(
    getRequestBodyForFalsePositives(...getExperimentsComparisonTuple()),
    actionTypes.SET_FALSE_POSITIVES_COUNT
  );

export const loadFalseNegatives = (
  startIndex: number,
  stopIndex: number
): SnowmanThunkAction<Promise<ExperimentIntersection>> =>
  loadTuples(
    getRequestBodyForFalseNegatives(...getExperimentsComparisonTuple()),
    startIndex,
    stopIndex
  );

const loadFalseNegativesCount = (): SnowmanThunkAction<Promise<void>> =>
  loadTuplesCountOf(
    getRequestBodyForFalseNegatives(...getExperimentsComparisonTuple()),
    actionTypes.SET_FALSE_NEGATIVES_COUNT
  );

export const loadBinaryMetricsTuplesCounts = (): SnowmanThunkAction<
  Promise<void>
> => async (dispatch: SnowmanDispatch): Promise<void> => {
  return RequestHandler(
    (): Promise<void> =>
      dispatch(loadFalseNegativesCount())
        .then((): Promise<void> => dispatch(loadTruePositivesCount()))
        .then((): Promise<void> => dispatch(loadFalsePositivesCount())),
    dispatch
  );
};

export const clickOnPane = (
  aPaneName: MetricsTuplesCategories
): SnowmanThunkAction<void> => (dispatch: SnowmanDispatch): SnowmanAction =>
  dispatch({
    type: actionTypes.CLICK_ON_PANE,
    payload: aPaneName,
  });

export const resetMetrics = (): SnowmanThunkAction<void> => (
  dispatch: SnowmanDispatch
): SnowmanAction =>
  dispatch({
    type: actionTypes.RESET_METRICS,
    // reducer ignores payload
    payload: false,
  });

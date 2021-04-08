import {
  BenchmarkApi,
  CalculateExperimentIntersectionRecordsRequest,
  FileResponse,
  Metric,
} from 'api';
import { BinaryMetricsStoreActionTypes as actionTypes } from 'store/actions/actionTypes';
import {
  getGroundTruthId,
  getMetrics,
} from 'store/actions/CommonMetricsActions';
import {
  SnowmanAction,
  SnowmanDispatch,
  SnowmanThunkAction,
} from 'store/messages';
import { Store } from 'store/models';
import { store } from 'store/store';
import { SUCCESS_LOAD_BINARY_METRICS } from 'structs/statusMessages';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';
import RequestHandler from 'utils/requestHandler';

export const getExperiment1 = (state: Store = store.getState()): Experiment => {
  return state.BenchmarkConfigurationStore.chosenExperiments[0];
};

export const getExperiment1Id = (state: Store = store.getState()): number => {
  return getExperiment1(state).id;
};

export const loadMetrics = (): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> => {
  dispatch(resetMetrics());
  dispatch(getMetrics(getExperiment1Id(), SUCCESS_LOAD_BINARY_METRICS)).then(
    (response: Metric[]): SnowmanAction =>
      dispatch({
        type: actionTypes.SET_ALL_METRICS,
        payload: response,
      })
  );
};

const getRequestBodyForTruePositives = (
  experimentId1: number,
  experimentId2: number
): CalculateExperimentIntersectionRecordsRequest['intersection'] => [
  {
    experimentId: experimentId1,
    predictedCondition: true,
  },
  {
    experimentId: experimentId2,
    predictedCondition: true,
  },
];

const getRequestBodyForFalsePositives = (
  experimentId1: number,
  experimentId2: number
): CalculateExperimentIntersectionRecordsRequest['intersection'] => [
  {
    experimentId: experimentId1,
    predictedCondition: false,
  },
  {
    experimentId: experimentId2,
    predictedCondition: true,
  },
];

const getRequestBodyForFalseNegatives = (
  experimentId1: number,
  experimentId2: number
): CalculateExperimentIntersectionRecordsRequest['intersection'] => [
  {
    experimentId: experimentId1,
    predictedCondition: true,
  },
  {
    experimentId: experimentId2,
    predictedCondition: false,
  },
];

const getRequestBodyForTrueNegatives = (
  experimentId1: number,
  experimentId2: number
): CalculateExperimentIntersectionRecordsRequest['intersection'] => [
  {
    experimentId: experimentId1,
    predictedCondition: false,
  },
  {
    experimentId: experimentId2,
    predictedCondition: false,
  },
];

type LoadTuplesRequestBody = ReturnType<typeof getRequestBodyForTruePositives>;

const getExperimentsComparisonTuple = (): [number, number] => [
  getGroundTruthId(),
  getExperiment1Id(),
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

export const loadTruePositives = (
  startIndex: number,
  stopIndex: number
): Promise<FileResponse> =>
  loadTuples(
    getRequestBodyForTruePositives(...getExperimentsComparisonTuple()),
    startIndex,
    stopIndex
  );

export const loadFalsePositives = (
  startIndex: number,
  stopIndex: number
): Promise<FileResponse> =>
  loadTuples(
    getRequestBodyForFalsePositives(...getExperimentsComparisonTuple()),
    startIndex,
    stopIndex
  );

export const loadFalseNegatives = (
  startIndex: number,
  stopIndex: number
): Promise<FileResponse> =>
  loadTuples(
    getRequestBodyForFalseNegatives(...getExperimentsComparisonTuple()),
    startIndex,
    stopIndex
  );

export const loadTrueNegatives = (
  startIndex: number,
  stopIndex: number
): Promise<FileResponse> =>
  loadTuples(
    getRequestBodyForTrueNegatives(...getExperimentsComparisonTuple()),
    startIndex,
    stopIndex
  );

export const loadBinaryMetricsTuplesCounts = (): SnowmanThunkAction<
  Promise<void>
> => async (dispatch: SnowmanDispatch): Promise<void> => {
  RequestHandler(
    () =>
      new BenchmarkApi()
        .calculateExperimentIntersectionCounts({
          experiments: getExperimentsComparisonTuple(),
        })
        .then((counts) =>
          dispatch({
            type: actionTypes.SET_ALL_COUNTS,
            payload: counts,
          })
        )
        .then(),
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

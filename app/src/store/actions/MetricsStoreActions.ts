import { BenchmarkApi, FileResponse, Metric } from 'api';
import { MetricsStoreActionTypes as actionTypes } from 'store/actions/actionTypes';
import {
  SnowmanAction,
  SnowmanDispatch,
  SnowmanThunkAction,
} from 'store/messages';
import { store } from 'store/store';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';
import RequestHandler from 'utils/requestHandler';
import {
  SUCCESS_LOAD_BINARY_METRICS,
  SUCCESS_LOAD_METRICS_TUPLES,
} from 'utils/statusMessages';

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

const loadTuples = (
  requestBody: LoadTuplesRequestBody,
  actionType: string
): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> =>
  RequestHandler<void>(
    (): Promise<void> =>
      new BenchmarkApi()
        .calculateExperimentIntersectionRecords(requestBody)
        .then(
          (res: FileResponse): SnowmanAction =>
            dispatch({
              type: actionType,
              payload: res,
            })
        )
        .then(),
    dispatch
  );

const loadTruePositives = (
  experimentId1: number,
  experimentId2: number
): SnowmanThunkAction<Promise<void>> =>
  loadTuples(
    getRequestBodyForTruePositives(experimentId1, experimentId2),
    actionTypes.SET_TRUE_POSITIVES_TUPLES
  );

const loadFalsePositives = (
  experimentId1: number,
  experimentId2: number
): SnowmanThunkAction<Promise<void>> =>
  loadTuples(
    getRequestBodyForFalsePositives(experimentId1, experimentId2),
    actionTypes.SET_FALSE_POSITIVES_TUPLES
  );

const loadFalseNegatives = (
  experimentId1: number,
  experimentId2: number
): SnowmanThunkAction<Promise<void>> =>
  loadTuples(
    getRequestBodyForFalseNegatives(experimentId1, experimentId2),
    actionTypes.SET_FALSE_NEGATIVES_TUPLES
  );

export const loadBinaryMetricsTuples = (): SnowmanThunkAction<
  Promise<void>
> => async (dispatch: SnowmanDispatch): Promise<void> => {
  dispatch(resetTuples());
  return RequestHandler(
    (): Promise<void> =>
      dispatch(loadFalseNegatives(getGroundTruthId(), getExperiment1Id()))
        .then(
          (): Promise<void> =>
            dispatch(loadTruePositives(getGroundTruthId(), getExperiment1Id()))
        )
        .then(
          (): Promise<void> =>
            dispatch(loadFalsePositives(getGroundTruthId(), getExperiment1Id()))
        ),
    dispatch,
    SUCCESS_LOAD_METRICS_TUPLES
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

export const resetTuples = (): SnowmanThunkAction<void> => (
  dispatch: SnowmanDispatch
): SnowmanAction =>
  dispatch({
    type: actionTypes.RESET_TUPLES,
    // reducer ignores payload
    payload: false,
  });

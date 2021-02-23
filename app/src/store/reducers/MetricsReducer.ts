import { ExperimentIntersection, Metric } from 'api';
import { MetricsStoreActionTypes as actionTypes } from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { MetricsStore } from 'store/models';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';

const initialState: MetricsStore = {
  metrics: [],
  falseNegatives: undefined,
  falsePositives: undefined,
  truePositives: undefined,
  selectedDataView: MetricsTuplesCategories.falsePositives,
};

export const MetricsReducer = (
  state: MetricsStore = initialState,
  action: SnowmanAction
): MetricsStore => {
  switch (action.type) {
    case actionTypes.RESET_METRICS:
      return {
        ...state,
        metrics: [],
      };
    case actionTypes.RESET_TUPLES:
      return {
        ...state,
        falseNegatives: undefined,
        falsePositives: undefined,
        truePositives: undefined,
      };
    case actionTypes.SET_ALL_METRICS:
      return {
        ...state,
        metrics: action.payload as Metric[],
      };
    case actionTypes.SET_TRUE_POSITIVES_TUPLES:
      return {
        ...state,
        truePositives: action.payload as ExperimentIntersection,
      };
    case actionTypes.SET_FALSE_POSITIVES_TUPLES:
      return {
        ...state,
        falsePositives: action.payload as ExperimentIntersection,
      };
    case actionTypes.SET_FALSE_NEGATIVES_TUPLES:
      return {
        ...state,
        falseNegatives: action.payload as ExperimentIntersection,
      };
    case actionTypes.CLICK_ON_PANE:
      return {
        ...state,
        selectedDataView: action.payload as MetricsTuplesCategories,
      };
    default:
      return state;
  }
};

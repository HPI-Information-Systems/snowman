import { Metric } from 'api';
import { MetricsStoreActionTypes as actionTypes } from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { MetricsStore } from 'store/models';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';

const initialState: MetricsStore = {
  metrics: [],
  falseNegativesCount: 0,
  falsePositivesCount: 0,
  truePositivesCount: 0,
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
    case actionTypes.SET_ALL_METRICS:
      return {
        ...state,
        metrics: action.payload as Metric[],
      };
    case actionTypes.SET_TRUE_POSITIVES_COUNT:
      return {
        ...state,
        truePositivesCount: action.payload as number,
      };
    case actionTypes.SET_FALSE_POSITIVES_COUNT:
      return {
        ...state,
        falsePositivesCount: action.payload as number,
      };
    case actionTypes.SET_FALSE_NEGATIVES_COUNT:
      return {
        ...state,
        falseNegativesCount: action.payload as number,
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

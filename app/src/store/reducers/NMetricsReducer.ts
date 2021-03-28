import { Metric } from 'api';
import { NMetricsPageActionTypes as actionTypes } from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { NMetricsStore } from 'store/models';

const initialState: NMetricsStore = {
  metrics: [],
};

export const NMetricsReducer = (
  state: NMetricsStore = initialState,
  action: SnowmanAction
): NMetricsStore => {
  switch (action.type) {
    case actionTypes.SET_ALL_METRICS:
      return {
        ...state,
        metrics: action.payload as Metric[][],
      };
    case actionTypes.RESET_METRICS:
      return {
        ...state,
        metrics: [],
      };
    default:
      return state;
  }
};

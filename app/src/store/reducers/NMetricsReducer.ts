import { Metric } from 'api';
import {
  DatasetsPageActionTypes,
  ExperimentsPageActionTypes,
  NMetricsPageActionTypes as actionTypes,
} from 'store/actions/actionTypes';
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
    case ExperimentsPageActionTypes.DRAG_N_DROP_EXPERIMENT:
    case DatasetsPageActionTypes.CLICK_ON_DATASET:
    case actionTypes.RESET_METRICS:
      return {
        ...state,
        metrics: [],
      };
    default:
      return state;
  }
};

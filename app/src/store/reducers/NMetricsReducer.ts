import { Metric } from 'api';
import {
  CoreStoreActionTypes,
  DatasetsPageActionTypes,
  ExperimentsPageActionTypes,
  NMetricsPageActionTypes as actionTypes,
  NMetricsPageActionTypes,
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
    case CoreStoreActionTypes.SET_ALL_EXPERIMENTS:
    case ExperimentsPageActionTypes.DRAG_N_DROP_EXPERIMENT:
    case DatasetsPageActionTypes.CLICK_ON_DATASET:
    case NMetricsPageActionTypes.INSPECT_AN_EXPERIMENT:
    case actionTypes.RESET_METRICS:
      return {
        ...state,
        metrics: [],
      };
    default:
      return state;
  }
};

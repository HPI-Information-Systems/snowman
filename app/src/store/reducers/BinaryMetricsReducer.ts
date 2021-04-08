import { ExperimentIntersectionPairCountsItem, Metric } from 'api';
import {
  BinaryMetricsStoreActionTypes as actionTypes,
  DatasetsPageActionTypes,
  ExperimentsPageActionTypes,
} from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { BinaryMetricsStore } from 'store/models';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';

const initialState: BinaryMetricsStore = {
  metrics: [],
  counts: [],
  selectedDataView: MetricsTuplesCategories.truePositives,
};

export const BinaryMetricsReducer = (
  state: BinaryMetricsStore = initialState,
  action: SnowmanAction
): BinaryMetricsStore => {
  switch (action.type) {
    case ExperimentsPageActionTypes.DRAG_N_DROP_EXPERIMENT:
    case DatasetsPageActionTypes.CLICK_ON_DATASET:
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
    case actionTypes.SET_ALL_COUNTS:
      return {
        ...state,
        counts: action.payload as ExperimentIntersectionPairCountsItem[],
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

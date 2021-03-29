import { Experiment, ExperimentIntersectionPairCountsItem } from 'api';
import {
  DatasetsPageActionTypes,
  ExperimentsPageActionTypes,
  IntersectionStoreActionTypes as actionTypes,
} from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { BenchmarkConfigurationStore, IntersectionStore } from 'store/models';

const initialState: IntersectionStore = {
  excluded: [],
  included: [],
  ignored: [],
  counts: [],
};

function filterId(
  state: IntersectionStore = initialState,
  payload: Experiment
) {
  return {
    ...state,
    ignored: state.ignored.filter(({ id }) => id !== payload.id),
    excluded: state.excluded.filter(({ id }) => id !== payload.id),
    included: state.included.filter(({ id }) => id !== payload.id),
  };
}

export const IntersectionReducer = (
  ownState: IntersectionStore = initialState,
  benchmarkState: BenchmarkConfigurationStore,
  action: SnowmanAction
): IntersectionStore => {
  switch (action.type) {
    case actionTypes.INCLUDE_EXPERIMENT: {
      const newState = filterId(ownState, action.payload as Experiment);
      newState.included.push(action.payload as Experiment);
      return newState;
    }
    case actionTypes.EXCLUDE_EXPERIMENT: {
      const newState = filterId(ownState, action.payload as Experiment);
      newState.excluded.push(action.payload as Experiment);
      return newState;
    }
    case actionTypes.IGNORE_EXPERIMENT: {
      const newState = filterId(ownState, action.payload as Experiment);
      newState.ignored.push(action.payload as Experiment);
      return newState;
    }
    case actionTypes.SET_COUNTS:
      return {
        ...ownState,
        counts: action.payload as ExperimentIntersectionPairCountsItem[],
      };
    case actionTypes.DRAG_N_DROP_EXPERIMENT: {
      return ownState;
    }
    case actionTypes.RESET_INTERSECTION:
    case ExperimentsPageActionTypes.DRAG_N_DROP_EXPERIMENT:
    case DatasetsPageActionTypes.CLICK_ON_DATASET:
      return {
        ...initialState,
        ignored: [
          ...benchmarkState.chosenGoldStandards,
          ...benchmarkState.chosenExperiments,
        ],
      };
    default:
      return ownState;
  }
};

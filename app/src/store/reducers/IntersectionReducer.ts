import {
  DatasetsPageActionTypes,
  ExperimentsPageActionTypes,
  IntersectionStoreActionTypes as actionTypes,
} from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { IntersectionStore } from 'store/models';

import { Experiment, ExperimentIntersectionPairCountsItem } from '../../api';

const initialState: IntersectionStore = {
  excluded: [],
  included: [],
  counts: [],
};

function filterId(
  state: IntersectionStore = initialState,
  payload: Experiment
) {
  return {
    ...state,
    excluded: state.excluded.filter(({ id }) => id !== payload.id),
    included: state.included.filter(({ id }) => id !== payload.id),
  };
}

export const IntersectionReducer = (
  state: IntersectionStore = initialState,
  action: SnowmanAction
): IntersectionStore => {
  switch (action.type) {
    case actionTypes.INCLUDE_EXPERIMENT: {
      const newState = filterId(state, action.payload as Experiment);
      newState.included.push(action.payload as Experiment);
      return newState;
    }
    case actionTypes.EXCLUDE_EXPERIMENT: {
      const newState = filterId(state, action.payload as Experiment);
      newState.excluded.push(action.payload as Experiment);
      return newState;
    }
    case actionTypes.IGNORE_EXPERIMENT:
      return filterId(state, action.payload as Experiment);
    case actionTypes.SET_COUNTS:
      return {
        ...state,
        counts: action.payload as ExperimentIntersectionPairCountsItem[],
      };
    case actionTypes.RESET_INTERSECTION:
      return {
        ...state,
        ...((action.payload as
          | {
              excluded: Experiment[];
              included: Experiment[];
            }
          | undefined) ?? {}),
      };
    case ExperimentsPageActionTypes.DRAG_N_DROP_EXPERIMENT:
    case DatasetsPageActionTypes.CLICK_ON_DATASET:
      return initialState;
    default:
      return state;
  }
};

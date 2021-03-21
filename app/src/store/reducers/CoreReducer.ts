import { Algorithm, Dataset, Experiment } from 'api';
import { CoreStoreActionTypes } from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { CoreStore } from 'store/models';

const initialState: CoreStore = {
  algorithms: [],
  datasets: [],
  experiments: [],
};

export const CoreReducer = (
  state: CoreStore = initialState,
  action: SnowmanAction
): CoreStore => {
  switch (action.type) {
    case CoreStoreActionTypes.SET_ALL_ALGORITHMS:
      return {
        ...state,
        algorithms: action.payload as Algorithm[],
      };
    case CoreStoreActionTypes.SET_ALL_DATASETS:
      return {
        ...state,
        datasets: action.payload as Dataset[],
      };
    case CoreStoreActionTypes.SET_ALL_EXPERIMENTS:
      return {
        ...state,
        experiments: action.payload as Experiment[],
      };
    default:
      return state;
  }
};

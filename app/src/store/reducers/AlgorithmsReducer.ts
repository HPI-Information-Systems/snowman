import { Algorithm } from 'api';
import { AlgorithmsStoreActionTypes } from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { AlgorithmsStore } from 'store/models';

const initialState: AlgorithmsStore = { algorithms: [] };

export const AlgorithmsReducer = (
  state: AlgorithmsStore = initialState,
  action: SnowmanAction
): AlgorithmsStore => {
  switch (action.type) {
    case AlgorithmsStoreActionTypes.SET_ALL_ALGORITHMS:
      return {
        ...state,
        algorithms: action.payload as Algorithm[],
      };
    default:
      return state;
  }
};

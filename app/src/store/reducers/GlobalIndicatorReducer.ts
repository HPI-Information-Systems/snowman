import { GlobalIndicatorStoreActionTypes as actionTypes } from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { GlobalIndicatorStore } from 'store/models';

const initialState: GlobalIndicatorStore = {
  showLoading: false,
  ongoingRequestsCount: 0,
};

export const GlobalIndicatorReducer = (
  state: GlobalIndicatorStore = initialState,
  action: SnowmanAction
): GlobalIndicatorStore => {
  switch (action.type) {
    case actionTypes.SHOW_LOADING:
      return {
        ...state,
        showLoading: true,
      };
    case actionTypes.HIDE_LOADING:
      return {
        ...state,
        showLoading: false,
      };
    case actionTypes.REGISTER_ONGOING_REQUEST:
      return {
        ...state,
        ongoingRequestsCount: state.ongoingRequestsCount + 1,
      };
    case actionTypes.UNREGISTER_ONGOING_REQUEST:
      return {
        ...state,
        ongoingRequestsCount: Math.max(state.ongoingRequestsCount - 1, 0),
      };
    default:
      return state;
  }
};

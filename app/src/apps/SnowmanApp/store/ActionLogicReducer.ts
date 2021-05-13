import { ActionLogicActionTypes } from 'apps/SnowmanApp/types/ActionLogicActionTypes';
import { ActionLogicModel } from 'apps/SnowmanApp/types/ActionLogicModel';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: ActionLogicModel = {
  showLoading: false,
  ongoingRequestsCount: 0,
};

const ActionLogicReducer = (
  state: ActionLogicModel = initialState,
  action: SnowmanAction
): ActionLogicModel => {
  switch (action.type) {
    case ActionLogicActionTypes.SHOW_LOADING:
      return {
        ...state,
        showLoading: true,
      };
    case ActionLogicActionTypes.HIDE_LOADING:
      return {
        ...state,
        showLoading: false,
      };
    case ActionLogicActionTypes.REGISTER_ONGOING_REQUEST:
      return {
        ...state,
        ongoingRequestsCount: state.ongoingRequestsCount + 1,
      };
    case ActionLogicActionTypes.UNREGISTER_ONGOING_REQUEST:
      return {
        ...state,
        ongoingRequestsCount: Math.max(state.ongoingRequestsCount - 1, 0),
      };
    default:
      return state;
  }
};

export default ActionLogicReducer;

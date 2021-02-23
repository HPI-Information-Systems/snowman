import { max } from 'lodash';
import { GlobalIndicatorStoreActionTypes as actionTypes } from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { GlobalIndicatorStore } from 'store/models';
import { ToastConfiguration } from 'types/ToastConfiguration';

const initialState: GlobalIndicatorStore = {
  currentToasts: [],
  showLoading: false,
  ongoingRequestsCount: 0,
};

export const GlobalIndicatorReducer = (
  state: GlobalIndicatorStore = initialState,
  action: SnowmanAction
): GlobalIndicatorStore => {
  switch (action.type) {
    case actionTypes.HIDE_TOAST:
      return {
        ...state,
        currentToasts: state.currentToasts.filter(
          (aToastConfiguration: ToastConfiguration): boolean =>
            aToastConfiguration.id !== (action.payload as number)
        ),
      };
    case actionTypes.SHOW_TOAST:
      return {
        ...state,
        currentToasts: [
          ...state.currentToasts,
          {
            message: (action.payload as ToastConfiguration).message,
            type: (action.payload as ToastConfiguration).type,
            id:
              (max(
                state.currentToasts.map(
                  (aToastConfiguration: ToastConfiguration): number =>
                    aToastConfiguration.id
                )
              ) ?? -1) + 1,
          },
        ],
      };
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

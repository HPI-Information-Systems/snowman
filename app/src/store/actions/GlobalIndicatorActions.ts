import { ToastType } from 'components/GlobalToast/ToastTypes';
import { GlobalIndicatorStoreActionTypes as actionTypes } from 'store/actions/actionTypes';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

export const hideToast = (toastId: number): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.HIDE_TOAST,
    payload: toastId,
  });

export const showToast = (
  aMessage: string,
  aType: ToastType = ToastType.Normal
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.SHOW_TOAST,
    // reducer ignores id field
    payload: { id: -1, message: aMessage, type: aType },
  });

export const hideLoading = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.HIDE_LOADING,
    // reducer ignores payload
    payload: false,
  });

export const showLoading = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.SHOW_LOADING,
    // reducer ignores payload
    payload: false,
  });

export const registerOngoingRequest = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.REGISTER_ONGOING_REQUEST,
    // reducer ignores payload
    payload: false,
  });

export const unregisterOngoingRequest = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.UNREGISTER_ONGOING_REQUEST,
    // reducer ignores payload
    payload: false,
  });

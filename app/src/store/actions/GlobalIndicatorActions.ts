import { toast } from 'react-toastify';
import { GlobalIndicatorStoreActionTypes as actionTypes } from 'store/actions/actionTypes';
import { SnowmanThunkAction } from 'store/messages';
import { ToastType } from 'types/ToastTypes';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

export const showToast = (
  aMessage: string,
  aType: ToastType = ToastType.Normal
): SnowmanThunkAction<void> => (): void => {
  switch (aType) {
    case ToastType.Normal:
      toast(aMessage);
      return;
    case ToastType.Success:
      toast.success(aMessage);
      return;
    case ToastType.Error:
      toast.error(aMessage);
      return;
    case ToastType.Warning:
      toast.warning(aMessage);
      return;
  }
};

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

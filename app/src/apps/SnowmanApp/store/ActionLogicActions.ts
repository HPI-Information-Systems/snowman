import { ActionLogicActionTypes } from 'apps/SnowmanApp/types/ActionLogicActionTypes';
import { SnowmanAppModel } from 'apps/SnowmanApp/types/SnowmanAppModel';
import { toast } from 'react-toastify';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';
import { ToastType } from 'types/ToastTypes';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

/*
It is not a real redux action that influences the store.
Moreover we want to dispatch opening a toast in context of redux actions
 */
export const showToast = (
  aMessage: string,
  aType: ToastType = ToastType.Normal
): SnowmanThunkAction<void, unknown> => (): void => {
  switch (aType) {
    case ToastType.Normal:
      toast.dark(aMessage);
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

export const hideLoading = (): easyPrimitiveActionReturn<SnowmanAppModel> =>
  easyPrimitiveAction<SnowmanAppModel>({
    type: ActionLogicActionTypes.HIDE_LOADING,
    // reducer ignores payload
    payload: false,
  });

export const showLoading = (): easyPrimitiveActionReturn<SnowmanAppModel> =>
  easyPrimitiveAction<SnowmanAppModel>({
    type: ActionLogicActionTypes.SHOW_LOADING,
    // reducer ignores payload
    payload: false,
  });

export const registerOngoingRequest = (): easyPrimitiveActionReturn<SnowmanAppModel> =>
  easyPrimitiveAction<SnowmanAppModel>({
    type: ActionLogicActionTypes.REGISTER_ONGOING_REQUEST,
    // reducer ignores payload
    payload: false,
  });

export const unregisterOngoingRequest = (): easyPrimitiveActionReturn<SnowmanAppModel> =>
  easyPrimitiveAction<SnowmanAppModel>({
    type: ActionLogicActionTypes.UNREGISTER_ONGOING_REQUEST,
    // reducer ignores payload
    payload: false,
  });

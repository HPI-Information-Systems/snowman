import { ActionLogicActionTypes } from 'apps/SnowmanApp/types/ActionLogicActionTypes';
import { toast } from 'react-toastify';
import { SnowmanAction } from 'types/SnowmanAction';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';
import { ToastType } from 'types/ToastTypes';

/*
It is not a real redux action that influences the store.
Moreover we want to dispatch opening a toast in context of redux actions
 */
export const showToast = (
  aMessage: string,
  aType: ToastType = ToastType.Normal
): SnowmanThunkAction<unknown, void> => (): void => {
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

export const hideLoading = (): SnowmanAction => ({
  type: ActionLogicActionTypes.HIDE_LOADING,
  // reducer ignores payload
  payload: false,
});

export const showLoading = (): SnowmanAction => ({
  type: ActionLogicActionTypes.SHOW_LOADING,
  // reducer ignores payload
  payload: false,
});

export const registerOngoingRequest = (): SnowmanAction => ({
  type: ActionLogicActionTypes.REGISTER_ONGOING_REQUEST,
  // reducer ignores payload
  payload: false,
});

export const unregisterOngoingRequest = (): SnowmanAction => ({
  type: ActionLogicActionTypes.UNREGISTER_ONGOING_REQUEST,
  // reducer ignores payload
  payload: false,
});

import {
  hideLoading,
  registerOngoingRequest,
  showLoading,
  showToast,
  unregisterOngoingRequest,
} from 'store/actions/GlobalIndicatorActions';
import { SnowmanDispatch } from 'store/messages';
import { UNKNOWN_ERROR } from 'structs/statusMessages';
import { ToastType } from 'types/ToastTypes';

export const unwrapError = async (error: unknown): Promise<string> => {
  if (error instanceof Response) {
    // If error occurred with HTTP
    return (await error.text()) ?? UNKNOWN_ERROR;
  } else if (typeof error === 'string') {
    return error;
  } else {
    return UNKNOWN_ERROR;
  }
};

const RequestHandler = async <T = void>(
  wrapped: () => Promise<T>,
  dispatch: SnowmanDispatch,
  successMessage?: string,
  shouldShowLoadingBlocker?: boolean
): Promise<T> => {
  if (shouldShowLoadingBlocker) dispatch(showLoading());
  dispatch(registerOngoingRequest());
  return wrapped()
    .then(
      (wrappedReturn: T): T => {
        if (successMessage !== undefined)
          dispatch(showToast(successMessage, ToastType.Success));
        return wrappedReturn;
      }
    )
    .catch(
      async (error: unknown): Promise<never> => {
        dispatch(showToast(await unwrapError(error), ToastType.Error));
        throw Error;
      }
    )
    .finally((): void => {
      dispatch(unregisterOngoingRequest());
      if (shouldShowLoadingBlocker) dispatch(hideLoading());
    });
};

export default RequestHandler;

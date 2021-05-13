import {
  hideLoading,
  registerOngoingRequest,
  showLoading,
  showToast,
  unregisterOngoingRequest,
} from 'apps/SnowmanApp/store/ActionLogicActions';
import { SnowmanAppDispatch } from 'apps/SnowmanApp/store/SnowmanAppStore';
import { UNKNOWN_ERROR } from 'structs/statusMessages';
import { ToastType } from 'types/ToastTypes';

export const unwrapError = async (error: unknown): Promise<string> => {
  if (error instanceof Response) {
    // If error occurred with HTTP
    return (await error.text()) ?? UNKNOWN_ERROR;
  } else if (typeof error === 'string') {
    return error;
  } else if (error instanceof Error) {
    return `${error.name}: ${error.message}`;
  } else {
    return UNKNOWN_ERROR;
  }
};

const RequestHandler = async <T = void>(
  wrapped: () => Promise<T>,
  successMessage?: string,
  shouldShowLoadingBlocker?: boolean
): Promise<T> => {
  if (shouldShowLoadingBlocker) SnowmanAppDispatch(showLoading());
  SnowmanAppDispatch(registerOngoingRequest());
  return (async () => wrapped())()
    .then(
      (wrappedReturn: T): T => {
        if (successMessage !== undefined)
          SnowmanAppDispatch(showToast(successMessage, ToastType.Success));
        return wrappedReturn;
      }
    )
    .catch(
      async (error: unknown): Promise<never> => {
        SnowmanAppDispatch(
          showToast(await unwrapError(error), ToastType.Error)
        );
        throw Error;
      }
    )
    .finally((): void => {
      SnowmanAppDispatch(unregisterOngoingRequest());
      if (shouldShowLoadingBlocker) SnowmanAppDispatch(hideLoading());
    });
};

export default RequestHandler;

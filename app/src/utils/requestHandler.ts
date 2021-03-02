import {
  hideLoading,
  registerOngoingRequest,
  showLoading,
  showToast,
  unregisterOngoingRequest,
} from 'store/actions/GlobalIndicatorActions';
import { SnowmanDispatch } from 'store/messages';
import { ToastType } from 'types/ToastTypes';
import { UNKNOWN_ERROR } from 'utils/statusMessages';

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
      async (result: unknown): Promise<never> => {
        // If error occurred with HTTP - show text
        if (result instanceof Response) {
          dispatch(
            showToast((await result.text()) ?? UNKNOWN_ERROR, ToastType.Error)
          );
        } else {
          // Else - show generic error
          dispatch(showToast(UNKNOWN_ERROR, ToastType.Error));
        }
        throw Error;
      }
    )
    .finally((): void => {
      dispatch(unregisterOngoingRequest());
      if (shouldShowLoadingBlocker) dispatch(hideLoading());
    });
};

export default RequestHandler;

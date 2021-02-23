import { ToastType } from 'components/GlobalToast/ToastTypes';
import {
  hideLoading,
  registerOngoingRequest,
  showLoading,
  showToast,
  unregisterOngoingRequest,
} from 'store/actions/GlobalIndicatorActions';
import { SnowmanDispatch } from 'store/messages';
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
      async (response: Response): Promise<never> => {
        dispatch(
          showToast((await response.text()) ?? UNKNOWN_ERROR, ToastType.Error)
        );
        throw Error;
      }
    )
    .finally((): void => {
      dispatch(unregisterOngoingRequest());
      if (shouldShowLoadingBlocker) dispatch(hideLoading());
    });
};

export default RequestHandler;

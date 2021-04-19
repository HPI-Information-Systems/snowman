import { Algorithm, AlgorithmApi } from 'api';
import { SnowmanAppDispatch } from 'apps/SnowmanApp/store/SnowmanAppStore';
import { CentralResourcesActionTypes } from 'apps/SnowmanApp/types/CentralResourcesActionTypes';
import { SnowmanAppModel } from 'apps/SnowmanApp/types/SnowmanAppModel';
import { SnowmanAction } from 'types/SnowmanAction';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';
import RequestHandler from 'utils/requestHandler';

export const refreshCentralResources = (): SnowmanThunkAction<
  Promise<void>,
  SnowmanAppModel
> => (dispatch: SnowmanDispatch<SnowmanAppModel>): Promise<void> =>
  dispatch(getAlgorithms()).then();

export const doRefreshCentralResources = (): Promise<void> =>
  SnowmanAppDispatch(refreshCentralResources());

export const getAlgorithms = (): SnowmanThunkAction<
  Promise<void>,
  SnowmanAppModel
> => async (dispatch: SnowmanDispatch<SnowmanAppModel>): Promise<void> =>
  RequestHandler<void>(() =>
    new AlgorithmApi()
      .getAlgorithms()
      .then(
        (algorithms: Algorithm[]): SnowmanAction =>
          dispatch({
            type: CentralResourcesActionTypes.STORE_ALGORITHMS,
            payload: algorithms,
          })
      )
      .then()
  );

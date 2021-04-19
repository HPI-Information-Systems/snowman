import { Algorithm, AlgorithmApi } from 'api';
import { CoreStoreActionTypes } from 'store/actions/actionTypes';
import {
  SnowmanAction,
  SnowmanDispatch,
  SnowmanThunkAction,
} from 'store/messages';
import RequestHandler from 'utils/requestHandler';

export const getAlgorithms = (): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> =>
  RequestHandler<void>(() =>
    new AlgorithmApi()
      .getAlgorithms()
      .then(
        (algorithms: Algorithm[]): SnowmanAction =>
          dispatch({
            type: CoreStoreActionTypes.SET_ALL_ALGORITHMS,
            payload: algorithms,
          })
      )
      .then()
  );

import { Algorithm, AlgorithmApi } from 'api';
import { CoreStoreActionTypes } from 'store/actions/actionTypes';
import {
  SnowmanAction,
  SnowmanDispatch,
  SnowmanThunkAction,
} from 'store/messages';
import { SUCCESS_DELETE_ALGORITHM } from 'structs/statusMessages';
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

export const deleteAlgorithm = (
  id: number
): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> =>
  RequestHandler(
    () =>
      new AlgorithmApi()
        .deleteAlgorithm({ algorithmId: id })
        .then((): Promise<void> => dispatch(getAlgorithms())),
    SUCCESS_DELETE_ALGORITHM
  );

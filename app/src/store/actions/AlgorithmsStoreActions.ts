import { AlgorithmApi } from 'api';
import { Algorithm } from 'api/models/Algorithm';
import { AlgorithmsStoreActionTypes } from 'store/actions/actionTypes';
import {
  SnowmanAction,
  SnowmanDispatch,
  SnowmanThunkAction,
} from 'store/messages';
import RequestHandler from 'utils/requestHandler';
import { SUCCESS_DELETE_ALGORITHM } from 'utils/statusMessages';

export const getAlgorithms = (): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> =>
  RequestHandler<void>(
    () =>
      new AlgorithmApi()
        .getAlgorithms()
        .then(
          (algorithms: Algorithm[]): SnowmanAction =>
            dispatch({
              type: AlgorithmsStoreActionTypes.SET_ALL_ALGORITHMS,
              payload: algorithms,
            })
        )
        .then(),
    dispatch
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
    dispatch,
    SUCCESS_DELETE_ALGORITHM
  );

import { ExperimentIntersection } from 'api';
import { TuplesLoader } from 'components/DataViewer/TuplesLoader';
import { DataViewerStoreActionTypes as actionTypes } from 'store/actions/actionTypes';
import { SnowmanDispatch, SnowmanThunkAction } from 'store/messages';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

export const resetDataViewer = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.RESET_DATA_VIEWER,
    // reducer ignores payload
    payload: false,
  });

export const reloadTuples = (
  startIndex: number,
  stopIndex: number,
  aTuplesLoader: TuplesLoader
): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> => {
  return dispatch(aTuplesLoader(startIndex, stopIndex)).then(
    (newTuples: ExperimentIntersection): void => {
      dispatch({
        type: actionTypes.RELOAD_TUPLES,
        payload: newTuples,
      });
    }
  );
};

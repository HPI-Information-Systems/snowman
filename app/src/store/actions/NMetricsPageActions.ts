import { Experiment, Metric } from 'api';
import { NMetricsStoreActionTypes } from 'store/actions/actionTypes';
import { getMetrics } from 'store/actions/CommonMetricsActions';
import { showToast } from 'store/actions/GlobalIndicatorActions';
import { SnowmanDispatch, SnowmanThunkAction } from 'store/messages';
import { store } from 'store/store';
import { SUCCESS_LOAD_NARY_METRICS } from 'structs/statusMessages';
import { ToastType } from 'types/ToastTypes';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

const resetMetrics = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: NMetricsStoreActionTypes.RESET_METRICS,
    // reducer ignores payload
    payload: false,
  });

export const loadNMetrics = (): SnowmanThunkAction<void> => (
  dispatch: SnowmanDispatch
): void => {
  dispatch(resetMetrics);
  Promise.all(
    store
      .getState()
      .BenchmarkConfigurationStore.chosenExperiments.map(
        (anExperiment: Experiment): Promise<Metric[]> =>
          dispatch(getMetrics(anExperiment.id))
      )
  ).then((metrics: Metric[][]): void => {
    dispatch({
      type: NMetricsStoreActionTypes.SET_ALL_METRICS,
      payload: metrics,
    });
    dispatch(showToast(SUCCESS_LOAD_NARY_METRICS, ToastType.Success));
  });
};

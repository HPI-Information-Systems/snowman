import { Experiment, Metric } from 'api';
import { showToast } from 'apps/SnowmanApp/store/ActionLogicActions';
import { NMetricsPageActionTypes } from 'store/actions/actionTypes';
import { getMetrics } from 'store/actions/CommonMetricsActions';
import { navigateTo } from 'store/actions/RenderStoreActions';
import { SnowmanDispatch, SnowmanThunkAction } from 'store/messages';
import { store } from 'store/store';
import { SUCCESS_LOAD_NARY_METRICS } from 'structs/statusMessages';
import { ToastType } from 'types/ToastTypes';
import { ViewIDs } from 'types/ViewIDs';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

const resetMetrics = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: NMetricsPageActionTypes.RESET_METRICS,
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
      type: NMetricsPageActionTypes.SET_ALL_METRICS,
      payload: metrics,
    });
    dispatch(showToast(SUCCESS_LOAD_NARY_METRICS, ToastType.Success));
  });
};

export const inspectOneExperiment = (
  anExperiment: Experiment
): SnowmanThunkAction<void> => (dispatch: SnowmanDispatch): void => {
  dispatch({
    type: NMetricsPageActionTypes.INSPECT_AN_EXPERIMENT,
    payload: anExperiment,
  });
  dispatch(navigateTo(ViewIDs.BINARY_METRICS));
};

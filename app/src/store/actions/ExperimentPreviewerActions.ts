import { Experiment } from 'api';
import { ExperimentPreviewerStoreActionTypes } from 'store/actions/actionTypes';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

export const openPreviewer = (
  anExperiment: Experiment
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: ExperimentPreviewerStoreActionTypes.OPEN_DIALOG,
    payload: anExperiment,
  });

export const closePreviewer = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: ExperimentPreviewerStoreActionTypes.CLOSE_DIALOG,
    // ignores payload
    payload: false,
  });

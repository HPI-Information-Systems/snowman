import { Experiment } from 'api';
import { ExperimentPreviewerStoreActionTypes } from 'store/actions/actionTypes';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
  easyPrimitiveDumpAction,
} from 'utils/easyActionsFactory';
import { couldPreviewExperiment } from 'utils/experimentsHelpers';

export const openPreviewer = (
  anExperiment: Experiment
): easyPrimitiveActionReturn =>
  couldPreviewExperiment(anExperiment)
    ? easyPrimitiveAction({
        type: ExperimentPreviewerStoreActionTypes.OPEN_DIALOG,
        payload: anExperiment,
      })
    : easyPrimitiveDumpAction();

export const closePreviewer = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: ExperimentPreviewerStoreActionTypes.CLOSE_DIALOG,
    // ignores payload
    payload: false,
  });

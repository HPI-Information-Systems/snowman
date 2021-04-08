import { Experiment } from 'api';
import { ExperimentPreviewerStoreActionTypes } from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { ExperimentPreviewerStore } from 'store/models';

const initialState: ExperimentPreviewerStore = {
  isOpen: false,
  experiment: undefined,
};

export const ExperimentPreviewerReducer = (
  state: ExperimentPreviewerStore = initialState,
  action: SnowmanAction
): ExperimentPreviewerStore => {
  switch (action.type) {
    case ExperimentPreviewerStoreActionTypes.OPEN_DIALOG:
      return {
        ...state,
        isOpen: true,
        experiment: action.payload as Experiment,
      };
    case ExperimentPreviewerStoreActionTypes.CLOSE_DIALOG:
      return {
        ...state,
        isOpen: false,
        experiment: undefined,
      };
    default:
      return state;
  }
};

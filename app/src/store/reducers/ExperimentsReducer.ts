import { Experiment } from 'api';
import { ExperimentsStoreActionTypes as actionTypes } from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { ExperimentsStore } from 'store/models';
import {
  toggleSelectionArrayMultipleSelect,
  toggleSelectionArraySingleSelect,
} from 'utils/toggleSelectionArray';

const initialState: ExperimentsStore = {
  experiments: [],
  selectedExperiments: [],
  selectedExperimentsTags: [],
};

export const ExperimentsReducer = (
  state: ExperimentsStore = initialState,
  action: SnowmanAction
): ExperimentsStore => {
  switch (action.type) {
    case actionTypes.SET_ALL_EXPERIMENTS:
      return {
        ...state,
        experiments: action.payload as Experiment[],
      };
    case actionTypes.CLICK_ON_TAG:
      return {
        ...state,
        selectedExperimentsTags: toggleSelectionArraySingleSelect(
          state.selectedExperimentsTags,
          action.payload as string
        ),
      };
    case actionTypes.RESET_SELECTED_EXPERIMENTS:
      return {
        ...state,
        selectedExperiments: [],
      };
    case actionTypes.CLICK_ON_EXPERIMENT:
      return {
        ...state,
        selectedExperiments: (() => {
          return toggleSelectionArrayMultipleSelect<number>(
            state.selectedExperiments,
            action.payload as number
          );
        })(),
      };
    default:
      return state;
  }
};

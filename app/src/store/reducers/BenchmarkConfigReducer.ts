import { difference, xor } from 'lodash';
import { BenchmarkConfigActionTypes } from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { BenchmarkConfigStore } from 'store/models';

const initialState: BenchmarkConfigStore = {
  availableExperiments: [],
  selectedExperiments: [],
  selectedGoldstandards: [],
};

export const BenchmarkConfigReducer = (
  state: BenchmarkConfigStore = initialState,
  action: SnowmanAction
): BenchmarkConfigStore => {
  switch (action.type) {
    case BenchmarkConfigActionTypes.SET_SELECTED_EXPERIMENTS:
      return { ...state, selectedExperiments: action.payload as number[] };
    case BenchmarkConfigActionTypes.SET_SELECTED_GOLDSTANDARDS:
      return { ...state, selectedGoldstandards: action.payload as number[] };
    case BenchmarkConfigActionTypes.SET_AVAILABLE_EXPERIMENTS:
      return { ...state, availableExperiments: action.payload as number[] };
    case BenchmarkConfigActionTypes.RESET_CONFIGURATOR:
      return {
        ...initialState,
        availableExperiments: action.payload as number[],
      };
    case BenchmarkConfigActionTypes.UPDATE_EXPERIMENTS:
      // Remove all experiments that are not selected anymore
      return {
        ...state,
        selectedGoldstandards: difference(
          state.selectedGoldstandards,
          xor(action.payload as number[], state.selectedGoldstandards)
        ),
        selectedExperiments: difference(
          state.selectedExperiments,
          xor(action.payload as number[], state.selectedExperiments)
        ),
        availableExperiments: difference(
          action.payload as number[],
          difference(
            state.selectedGoldstandards,
            xor(action.payload as number[], state.selectedGoldstandards)
          ),
          difference(
            state.selectedExperiments,
            xor(action.payload as number[], state.selectedExperiments)
          )
        ),
      };
    default:
      return state;
  }
};

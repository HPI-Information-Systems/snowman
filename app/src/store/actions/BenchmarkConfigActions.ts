import { BenchmarkConfigActionTypes as actionTypes } from 'store/actions/actionTypes';
import {
  SnowmanAction,
  SnowmanDispatch,
  SnowmanThunkAction,
} from 'store/messages';

export const setSelectedExperiments = (
  selectedExperiments: number[]
): SnowmanThunkAction<void> => (dispatch: SnowmanDispatch): SnowmanAction =>
  dispatch({
    type: actionTypes.SET_SELECTED_EXPERIMENTS,
    payload: selectedExperiments,
  });

export const setSelectedGoldstandards = (
  selectedGoldstandards: number[]
): SnowmanThunkAction<void> => (dispatch: SnowmanDispatch): SnowmanAction =>
  dispatch({
    type: actionTypes.SET_SELECTED_GOLDSTANDARDS,
    payload: selectedGoldstandards,
  });

export const setAvailableExperiments = (
  availableExperiments: number[]
): SnowmanThunkAction<void> => (dispatch: SnowmanDispatch): SnowmanAction =>
  dispatch({
    type: actionTypes.SET_AVAILABLE_EXPERIMENTS,
    payload: availableExperiments,
  });

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

export const resetConfigurator = (
  availableExperiments: number[]
): SnowmanThunkAction<void> => (dispatch: SnowmanDispatch): SnowmanAction =>
  dispatch({
    type: actionTypes.RESET_CONFIGURATOR,
    payload: availableExperiments,
  });

export const updateExperiments = (
  availableExperiments: number[]
): SnowmanThunkAction<void> => (dispatch: SnowmanDispatch): SnowmanAction =>
  dispatch({
    type: actionTypes.UPDATE_EXPERIMENTS,
    payload: availableExperiments,
  });

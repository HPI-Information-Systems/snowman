import { Experiment, ExperimentsApi } from 'api';
import { ExperimentsStoreActionTypes as actionTypes } from 'store/actions/actionTypes';
import {
  SnowmanAction,
  SnowmanDispatch,
  SnowmanThunkAction,
} from 'store/messages';
import { SUCCESS_TO_DELETE_EXPERIMENT } from 'structs/statusMessages';
import { DragNDropDescriptor } from 'types/DragNDropDescriptor';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';
import RequestHandler from 'utils/requestHandler';

export const clickOnExperimentTag = (aTag: string): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.CLICK_ON_TAG,
    payload: aTag,
  });

export const clickOnExperiment = (
  selectedExperimentId: number
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.CLICK_ON_EXPERIMENT,
    payload: selectedExperimentId,
  });

export const dragExperiment = (
  eventDescriptor: DragNDropDescriptor
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.DRAG_N_DROP_EXPERIMENT,
    payload: eventDescriptor,
  });

export const resetSelectedExperiments = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.RESET_SELECTED_EXPERIMENTS,
    payload: 0,
  });

export const getExperiments = (): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> =>
  RequestHandler(
    (): Promise<void> =>
      new ExperimentsApi()
        .getExperiments()
        .then(
          (experiments: Experiment[]): SnowmanAction =>
            dispatch({
              type: actionTypes.SET_ALL_EXPERIMENTS,
              payload: experiments,
            })
        )
        .then(),
    dispatch
  );

export const deleteExperiment = (
  id: number
): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> => {
  // Reset current experiment
  dispatch(resetSelectedExperiments());
  return RequestHandler(
    (): Promise<void> =>
      new ExperimentsApi().deleteExperiment({ experimentId: id }),
    dispatch,
    SUCCESS_TO_DELETE_EXPERIMENT
  ).then((): Promise<void> => dispatch(getExperiments()));
};

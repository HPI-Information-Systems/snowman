import { Algorithm, Experiment, ExperimentsApi } from 'api';
import { TuplesLoader } from 'components/DataViewer/TuplesLoader';
import { DropResult } from 'react-beautiful-dnd';
import {
  CoreStoreActionTypes,
  ExperimentsPageActionTypes,
} from 'store/actions/actionTypes';
import {
  SnowmanAction,
  SnowmanDispatch,
  SnowmanThunkAction,
} from 'store/messages';
import { SUCCESS_TO_DELETE_EXPERIMENT } from 'structs/statusMessages';
import { ExperimentBuckets } from 'types/ExperimentBuckets';
import { getDndDescriptorFromDropResult } from 'utils/dragNDropHelpers';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';
import RequestHandler from 'utils/requestHandler';

export const clickOnMatchingSolution = (
  aMatchingSolution: Algorithm
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: ExperimentsPageActionTypes.CLICK_ON_MATCHING_SOLUTION,
    payload: aMatchingSolution,
  });

export const dragNDropAnExperiment = (
  aDropResult: DropResult
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: ExperimentsPageActionTypes.DRAG_N_DROP_EXPERIMENT,
    payload: getDndDescriptorFromDropResult<ExperimentBuckets>(
      aDropResult,
      ExperimentBuckets.AVAILABLE_EXPERIMENTS
    ),
  });

export const clickOnExperimentsFilterTool = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: ExperimentsPageActionTypes.CLICK_ON_EXPERIMENTS_FILTER_TOOL,
    // reducer ignores payload
    payload: false,
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
              type: CoreStoreActionTypes.SET_ALL_EXPERIMENTS,
              payload: experiments,
            })
        )
        .then(),
    dispatch
  );

export const deleteExperiment = (
  anExperiment: Experiment
): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> =>
  RequestHandler(
    (): Promise<void> =>
      new ExperimentsApi().deleteExperiment({ experimentId: anExperiment.id }),
    dispatch,
    SUCCESS_TO_DELETE_EXPERIMENT
  ).then((): Promise<void> => dispatch(getExperiments()));

// Cache loaders to not trigger a rerender
const experimentTuplesLoaders = new Map<number, TuplesLoader>();
export const experimentTuplesLoader = (experimentId: number): TuplesLoader => {
  let tuplesLoader = experimentTuplesLoaders.get(experimentId);
  if (!tuplesLoader) {
    tuplesLoader = (startAt, stop) =>
      new ExperimentsApi().getExperimentFile({
        experimentId: experimentId,
        startAt,
        limit: stop - startAt,
      });
    experimentTuplesLoaders.set(experimentId, tuplesLoader);
  }
  return tuplesLoader;
};

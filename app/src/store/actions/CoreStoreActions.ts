import {
  Algorithm,
  AlgorithmApi,
  Dataset,
  DatasetsApi,
  Experiment,
  ExperimentsApi,
} from 'api';
import { CoreStoreActionTypes } from 'store/actions/actionTypes';
import {
  SnowmanAction,
  SnowmanDispatch,
  SnowmanThunkAction,
} from 'store/messages';
import {
  SUCCESS_DELETE_ALGORITHM,
  SUCCESS_TO_DELETE_DATASET,
  SUCCESS_TO_DELETE_EXPERIMENT,
} from 'structs/statusMessages';
import RequestHandler from 'utils/requestHandler';

export const getAlgorithms = (): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> =>
  RequestHandler<void>(
    () =>
      new AlgorithmApi()
        .getAlgorithms()
        .then(
          (algorithms: Algorithm[]): SnowmanAction =>
            dispatch({
              type: CoreStoreActionTypes.SET_ALL_ALGORITHMS,
              payload: algorithms,
            })
        )
        .then(),
    dispatch
  );

export const deleteAlgorithm = (
  id: number
): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> =>
  RequestHandler(
    () =>
      new AlgorithmApi()
        .deleteAlgorithm({ algorithmId: id })
        .then((): Promise<void> => dispatch(getAlgorithms())),
    dispatch,
    SUCCESS_DELETE_ALGORITHM
  );

export const getDatasets = (): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> =>
  RequestHandler(
    (): Promise<void> =>
      new DatasetsApi()
        .getDatasets()
        .then(
          (allDatasets: Dataset[]): SnowmanAction =>
            dispatch({
              type: CoreStoreActionTypes.SET_ALL_DATASETS,
              payload: allDatasets,
            })
        )
        .then(),
    dispatch
  );

export const deleteDataset = (
  aDataset: Dataset
): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> =>
  RequestHandler(
    (): Promise<void> =>
      new DatasetsApi().deleteDataset({ datasetId: aDataset.id }),
    dispatch,
    SUCCESS_TO_DELETE_DATASET
  ).then((): Promise<void> => dispatch(getDatasets()));

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

import {
  Algorithm,
  AlgorithmApi,
  Dataset,
  DatasetsApi,
  Experiment,
  ExperimentsApi,
} from 'api';
import { BenchmarkAppActionsTypes } from 'pages/BenchmarkPage/types/BenchmarkAppActionsTypes';
import {
  BenchmarkAppDispatch,
  BenchmarkAppThunkAction,
} from 'pages/BenchmarkPage/types/BenchmarkAppModel';
import { SnowmanAction } from 'store/messages';
import RequestHandler from 'utils/requestHandler';

export const getAlgorithms = (): BenchmarkAppThunkAction<
  Promise<void>
> => async (dispatch: BenchmarkAppDispatch): Promise<void> =>
  RequestHandler<void>(() =>
    new AlgorithmApi()
      .getAlgorithms()
      .then(
        (algorithms: Algorithm[]): SnowmanAction =>
          dispatch({
            type: BenchmarkAppActionsTypes.SET_ALGORITHMS,
            payload: algorithms,
          })
      )
      .then()
  );

export const getDatasets = (): BenchmarkAppThunkAction<Promise<void>> => async (
  dispatch: BenchmarkAppDispatch
): Promise<void> =>
  RequestHandler<void>(() =>
    new DatasetsApi()
      .getDatasets()
      .then(
        (datasets: Dataset[]): SnowmanAction =>
          dispatch({
            type: BenchmarkAppActionsTypes.SET_DATASETS,
            payload: datasets,
          })
      )
      .then()
  );

export const getExperiments = (): BenchmarkAppThunkAction<
  Promise<void>
> => async (dispatch: BenchmarkAppDispatch): Promise<void> =>
  RequestHandler<void>(() =>
    new ExperimentsApi()
      .getExperiments()
      .then(
        (experiments: Experiment[]): SnowmanAction =>
          dispatch({
            type: BenchmarkAppActionsTypes.SET_EXPERIMENTS,
            payload: experiments,
          })
      )
      .then()
  );

import {
  Algorithm,
  AlgorithmApi,
  Dataset,
  DatasetsApi,
  Experiment,
  ExperimentsApi,
  SimilarityThresholdFunction,
  SimilarityThresholdsApi,
} from 'api';
import { BenchmarkAppActionsTypes } from 'apps/BenchmarkApp/types/BenchmarkAppActionsTypes';
import {
  BenchmarkAppDispatch,
  BenchmarkAppThunkAction,
} from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { SnowmanAction } from 'types/SnowmanAction';
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

export const getSimFunctions = (): BenchmarkAppThunkAction<
  Promise<void>
> => async (dispatch: BenchmarkAppDispatch): Promise<void> =>
  RequestHandler<void>(() =>
    new SimilarityThresholdsApi()
      .getSimilarityThresholdFunctions()
      .then(
        (simFunctions: SimilarityThresholdFunction[]): SnowmanAction =>
          dispatch({
            type: BenchmarkAppActionsTypes.SET_SIM_FUNCTIONS,
            payload: simFunctions,
          })
      )
      .then()
  );

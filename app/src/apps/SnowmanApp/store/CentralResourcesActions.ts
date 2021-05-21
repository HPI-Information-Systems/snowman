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
import { CentralResourcesActionTypes } from 'apps/SnowmanApp/types/CentralResourcesActionTypes';
import { SnowmanAppModel } from 'apps/SnowmanApp/types/SnowmanAppModel';
import {
  SUCCESS_TO_DELETE_ALGORITHM,
  SUCCESS_TO_DELETE_DATASET,
  SUCCESS_TO_DELETE_EXPERIMENT,
  SUCCESS_TO_DELETE_SIMILARITY_THRESHOLD_FUNCTION,
} from 'structs/statusMessages';
import { SnowmanAction } from 'types/SnowmanAction';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';
import RequestHandler from 'utils/requestHandler';

export const refreshCentralResources = (): SnowmanThunkAction<
  Promise<void>,
  SnowmanAppModel
> => (dispatch: SnowmanDispatch<SnowmanAppModel>): Promise<void> =>
  Promise.all([
    dispatch(getAlgorithms()).then(),
    dispatch(getDatasets()).then(),
    dispatch(getExperiments()).then(),
    dispatch(getSimFunctions()).then(),
  ]).then();

export const getAlgorithms = (): SnowmanThunkAction<
  Promise<void>,
  SnowmanAppModel
> => async (dispatch: SnowmanDispatch<SnowmanAppModel>): Promise<void> =>
  RequestHandler<void>(() =>
    new AlgorithmApi()
      .getAlgorithms()
      .then(
        (algorithms: Algorithm[]): SnowmanAction =>
          dispatch({
            type: CentralResourcesActionTypes.STORE_ALGORITHMS,
            payload: algorithms,
          })
      )
      .then()
  );

export const getDatasets = (): SnowmanThunkAction<
  Promise<void>,
  SnowmanAppModel
> => async (dispatch: SnowmanDispatch<SnowmanAppModel>): Promise<void> =>
  RequestHandler<void>(() =>
    new DatasetsApi()
      .getDatasets()
      .then(
        (datasets: Dataset[]): SnowmanAction =>
          dispatch({
            type: CentralResourcesActionTypes.STORE_DATASETS,
            payload: datasets,
          })
      )
      .then()
  );

export const getExperiments = (): SnowmanThunkAction<
  Promise<void>,
  SnowmanAppModel
> => async (dispatch: SnowmanDispatch<SnowmanAppModel>): Promise<void> =>
  RequestHandler<void>(() =>
    new ExperimentsApi()
      .getExperiments()
      .then(
        (experiments: Experiment[]): SnowmanAction =>
          dispatch({
            type: CentralResourcesActionTypes.STORE_EXPERIMENTS,
            payload: experiments,
          })
      )
      .then()
  );

export const getSimFunctions = (): SnowmanThunkAction<
  Promise<void>,
  SnowmanAppModel
> => async (dispatch: SnowmanDispatch<SnowmanAppModel>): Promise<void> =>
  RequestHandler<void>(() =>
    new SimilarityThresholdsApi()
      .getSimilarityThresholdFunctions()
      .then(
        (functions: SimilarityThresholdFunction[]): SnowmanAction =>
          dispatch({
            type: CentralResourcesActionTypes.STORE_SIMFUNCTIONS,
            payload: functions,
          })
      )
      .then()
  );

export const deleteAlgorithm = (
  id: number
): SnowmanThunkAction<Promise<void>, SnowmanAppModel> => async (
  dispatch: SnowmanDispatch<SnowmanAppModel>
): Promise<void> =>
  RequestHandler<void>(
    () =>
      new AlgorithmApi()
        .deleteAlgorithm({ algorithmId: id })
        .then((): Promise<void> => dispatch(refreshCentralResources())),
    SUCCESS_TO_DELETE_ALGORITHM
  );

export const deleteDataset = (
  id: number
): SnowmanThunkAction<Promise<void>, SnowmanAppModel> => async (
  dispatch: SnowmanDispatch<SnowmanAppModel>
): Promise<void> =>
  RequestHandler<void>(
    () =>
      new DatasetsApi()
        .deleteDataset({ datasetId: id })
        .then((): Promise<void> => dispatch(refreshCentralResources())),
    SUCCESS_TO_DELETE_DATASET
  );

export const deleteExperiment = (
  id: number
): SnowmanThunkAction<Promise<void>, SnowmanAppModel> => async (
  dispatch: SnowmanDispatch<SnowmanAppModel>
): Promise<void> =>
  RequestHandler<void>(
    () =>
      new ExperimentsApi()
        .deleteExperiment({ experimentId: id })
        .then((): Promise<void> => dispatch(refreshCentralResources())),
    SUCCESS_TO_DELETE_EXPERIMENT
  );

export const deleteSimFunction = (
  id: number
): SnowmanThunkAction<Promise<void>, SnowmanAppModel> => async (
  dispatch: SnowmanDispatch<SnowmanAppModel>
): Promise<void> =>
  RequestHandler<void>(
    () =>
      new SimilarityThresholdsApi()
        .deleteSimilarityThresholdFunction({ functionId: id })
        .then((): Promise<void> => dispatch(refreshCentralResources())),
    SUCCESS_TO_DELETE_SIMILARITY_THRESHOLD_FUNCTION
  );

import { BenchmarkAppActionsTypes } from 'pages/BenchmarkPage/store/BenchmarkAppActionsTypes';
import { BenchmarkAppModel } from 'pages/BenchmarkPage/store/BenchmarkAppModel';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

export const selectDatasetChildren = (
  aDatasetId: number
): easyPrimitiveActionReturn<BenchmarkAppModel> =>
  easyPrimitiveAction<BenchmarkAppModel>({
    type: BenchmarkAppActionsTypes.SELECT_DATASET_CHILDREN,
    payload: aDatasetId,
  });

export const selectAlgorithmInDatasetChildren = (
  aDatasetId: number,
  anAlgorithmId: number
): easyPrimitiveActionReturn<BenchmarkAppModel> =>
  easyPrimitiveAction<BenchmarkAppModel>({
    type: BenchmarkAppActionsTypes.SELECT_ALGORITHM_CHILDREN,
    payload: aDatasetId,
    optionalPayload: anAlgorithmId,
  });

export const selectExperimentBy = (
  anExperimentId: number
): easyPrimitiveActionReturn<BenchmarkAppModel> =>
  easyPrimitiveAction<BenchmarkAppModel>({
    type: BenchmarkAppActionsTypes.SELECT_EXPERIMENT,
    payload: anExperimentId,
  });

export const expandDataset = (
  aDatasetId: number
): easyPrimitiveActionReturn<BenchmarkAppModel> =>
  easyPrimitiveAction<BenchmarkAppModel>({
    type: BenchmarkAppActionsTypes.EXPAND_DATASET,
    payload: aDatasetId,
  });

export const shrinkDataset = (
  aDatasetId: number
): easyPrimitiveActionReturn<BenchmarkAppModel> =>
  easyPrimitiveAction<BenchmarkAppModel>({
    type: BenchmarkAppActionsTypes.SHRINK_DATASET,
    payload: aDatasetId,
  });

export const expandAlgorithmInDataset = (
  aDatasetId: number,
  anAlgorithmId: number
): easyPrimitiveActionReturn<BenchmarkAppModel> =>
  easyPrimitiveAction<BenchmarkAppModel>({
    type: BenchmarkAppActionsTypes.EXPAND_ALGORITHM,
    payload: aDatasetId,
    optionalPayload: anAlgorithmId,
  });

export const shrinkAlgorithmInDataset = (
  aDatasetId: number,
  anAlgorithmId: number
): easyPrimitiveActionReturn<BenchmarkAppModel> =>
  easyPrimitiveAction<BenchmarkAppModel>({
    type: BenchmarkAppActionsTypes.SHRINK_ALGORITHM,
    payload: aDatasetId,
    optionalPayload: anAlgorithmId,
  });

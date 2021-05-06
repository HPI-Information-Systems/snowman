import { BenchmarkAppStoreMagistrate } from 'apps/BenchmarkApp/store/BenchmarkAppStoreFactory';
import { BenchmarkAppActionsTypes } from 'apps/BenchmarkApp/types/BenchmarkAppActionsTypes';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
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
    type: BenchmarkAppActionsTypes.TOGGLE_EXPERIMENT,
    payload: anExperimentId,
  });

export const expandDataset = (
  aDatasetId: number
): easyPrimitiveActionReturn<BenchmarkAppModel> =>
  easyPrimitiveAction<BenchmarkAppModel>({
    type: BenchmarkAppActionsTypes.EXPAND_DATASET,
    payload: aDatasetId,
  });

export const expandDatasetFull = (
  aDatasetId: number
): easyPrimitiveActionReturn<BenchmarkAppModel> =>
  easyPrimitiveAction<BenchmarkAppModel>({
    type: BenchmarkAppActionsTypes.EXPAND_DATASET_FULL,
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

export const setSearchString = (
  aSearchString: string
): easyPrimitiveActionReturn<BenchmarkAppModel> =>
  easyPrimitiveAction<BenchmarkAppModel>({
    type: BenchmarkAppActionsTypes.SET_SEARCH_STRING,
    payload: aSearchString,
  });

export const openStrategy = (
  aStrategyId: StrategyIDs
): easyPrimitiveActionReturn<BenchmarkAppModel> =>
  easyPrimitiveAction<BenchmarkAppModel>({
    type: BenchmarkAppActionsTypes.OPEN_STRATEGY,
    payload: aStrategyId,
  });

export const doOpenStrategy = (aStrategyId: StrategyIDs): void => {
  (BenchmarkAppStoreMagistrate.getStore()
    .dispatch as SnowmanDispatch<BenchmarkAppModel>)(openStrategy(aStrategyId));
};

export const selectNone = (): easyPrimitiveActionReturn<BenchmarkAppModel> =>
  easyPrimitiveAction<BenchmarkAppModel>({
    type: BenchmarkAppActionsTypes.SELECT_NONE,
    // payload is not used
    payload: false,
  });

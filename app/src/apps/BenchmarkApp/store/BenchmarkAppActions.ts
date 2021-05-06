import { BenchmarkAppStoreMagistrate } from 'apps/BenchmarkApp/store/BenchmarkAppStoreFactory';
import { BenchmarkAppActionsTypes } from 'apps/BenchmarkApp/types/BenchmarkAppActionsTypes';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

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

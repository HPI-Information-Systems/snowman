import { serializeCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/serializeCacheKey';
import {
  ModelOfCache,
  StoreCacheKey,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import { BenchmarkAppStoreMagistrate } from 'apps/BenchmarkApp/store/BenchmarkAppStoreFactory';
import {
  BenchmarkAppDispatch,
  BenchmarkAppModel,
} from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { ConfigurationStoreActionTypes } from 'apps/BenchmarkApp/types/ConfigurationStoreActionTypes';
import { ConfigurationStoreModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

const setSelection = <Cache extends keyof ConfigurationStoreModel>(
  cache: Cache,
  aCacheKey: StoreCacheKey,
  newSelection: (ModelOfCache<Cache> | undefined)[]
): easyPrimitiveActionReturn<BenchmarkAppModel> =>
  easyPrimitiveAction<BenchmarkAppModel>({
    type: ConfigurationStoreActionTypes.SET_SELECTION,
    payload: cache,
    optionalPayload: aCacheKey,
    optionalPayload2: newSelection,
  });

export const getSelection = <Cache extends keyof ConfigurationStoreModel>(
  state: BenchmarkAppModel,
  cache: Cache,
  aCacheKey: StoreCacheKey
): (ModelOfCache<Cache> | undefined)[] => [
  ...((state.config[cache][serializeCacheKey(aCacheKey)]?.targets ?? []) as (
    | ModelOfCache<Cache>
    | undefined
  )[]),
];

export const updateSelection = <Cache extends keyof ConfigurationStoreModel>(
  cache: Cache,
  {
    aCacheKey,
    newSelection,
    allowMultiple = true,
  }: {
    aCacheKey: StoreCacheKey;
    newSelection: (ModelOfCache<Cache> | undefined)[];
    allowMultiple?: boolean;
  }
): SnowmanThunkAction<void, BenchmarkAppModel> => (dispatch, state): void => {
  if (!allowMultiple) {
    const currentSelection = getSelection(state(), cache, aCacheKey);
    if (newSelection.length > 0) {
      const swapIndex = currentSelection.indexOf(newSelection[0]);
      if (swapIndex > 0) {
        if (currentSelection[0] === undefined) {
          currentSelection.splice(swapIndex, 1);
        } else {
          currentSelection[swapIndex] = currentSelection[0];
        }
      }
    }
    currentSelection[0] = newSelection[0];
    newSelection = currentSelection;
  }
  dispatch(setSelection(cache, aCacheKey, newSelection));
};

export const doPrimeSelection = <Cache extends keyof ConfigurationStoreModel>(
  cache: Cache,
  {
    aCacheKey,
    selectFirst,
  }: {
    aCacheKey: StoreCacheKey;
    selectFirst: ModelOfCache<Cache>;
  }
): void => {
  (BenchmarkAppStoreMagistrate.getStore().dispatch as BenchmarkAppDispatch)(
    updateSelection(cache, {
      aCacheKey,
      newSelection: [selectFirst],
      allowMultiple: false,
    })
  );
};

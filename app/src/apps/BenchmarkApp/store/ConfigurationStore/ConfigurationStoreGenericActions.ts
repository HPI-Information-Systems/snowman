import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { StoreCacheKey } from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';
import { ConfigurationStoreActionTypes } from 'apps/BenchmarkApp/types/ConfigurationStoreActionTypes';
import {
  ConfigurationCache,
  ConfigurationCacheItem,
} from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

const setSelection = <Target, Filter>(
  setSelectionAction: ConfigurationStoreActionTypes,
  aCacheKey: StoreCacheKey,
  aCacheItem: ConfigurationCacheItem<Target, Filter>
): easyPrimitiveActionReturn<BenchmarkAppModel> =>
  easyPrimitiveAction<BenchmarkAppModel>({
    type: setSelectionAction,
    payload: aCacheKey,
    optionalPayload: aCacheItem,
  });

const getSelection = <Target, Filter>(
  cache: ConfigurationCache<Target, Filter>,
  aCacheKey: StoreCacheKey,
  filter: Filter
): ConfigurationCacheItem<Target, Filter> =>
  cache[aCacheKey] ?? { filter, targets: [] };

export const updateSelection = <Target, Filter>({
  cache,
  aCacheKey,
  filter,
  newSelection,
  setSelectionAction,
  allowMultiple = true,
}: {
  cache: ConfigurationCache<Target, Filter>;
  aCacheKey: StoreCacheKey;
  filter: Filter;
  newSelection: Target[];
  setSelectionAction: ConfigurationStoreActionTypes;
  allowMultiple?: boolean;
}): SnowmanThunkAction<void, BenchmarkAppModel> => (
  dispatch: SnowmanDispatch<BenchmarkAppModel>
): void => {
  const selection = { ...getSelection(cache, aCacheKey, filter) };
  if (!allowMultiple) {
    if (newSelection.length > 0) {
      const swapIndex = selection.targets.indexOf(newSelection[0]);
      if (swapIndex > 0) {
        selection.targets = selection.targets.slice();
        if (selection.targets[0] === undefined) {
          selection.targets.splice(swapIndex, 1);
        } else {
          selection.targets[swapIndex] = selection.targets[0];
        }
      }
    }
    selection.targets[0] = newSelection[0];
  } else {
    selection.targets = newSelection;
  }
  dispatch(setSelection(setSelectionAction, aCacheKey, selection));
};

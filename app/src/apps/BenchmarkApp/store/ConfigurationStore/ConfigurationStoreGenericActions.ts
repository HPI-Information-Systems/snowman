import { BenchmarkAppStoreMagistrate } from 'apps/BenchmarkApp/store/BenchmarkAppStoreFactory';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import {
  GetCacheKey,
  GetMultiSelectCacheKey,
} from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';
import { ConfigurationStoreActionTypes } from 'apps/BenchmarkApp/types/ConfigurationStoreActionTypes';
import { StoreCacheKey } from 'apps/BenchmarkApp/types/StoreCacheKey';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

const setMultiSelectNumberEntries = (
  aCacheKey: StoreCacheKey,
  numberEntries: number
): easyPrimitiveActionReturn<BenchmarkAppModel> =>
  easyPrimitiveAction({
    type: ConfigurationStoreActionTypes.SET_NUMBER_ENTRIES,
    payload: aCacheKey,
    optionalPayload: numberEntries,
  });

export const updateSelection = <T>(
  getCacheKey: GetCacheKey,
  setter: (
    cacheKey: StoreCacheKey,
    value: T | undefined
  ) => easyPrimitiveActionReturn<BenchmarkAppModel>,
  selection: (T | undefined)[]
): SnowmanThunkAction<void, BenchmarkAppModel> => (dispatch) => {
  let oldNumberEntries =
    BenchmarkAppStoreMagistrate.getStore().getState().config.multiSelects[
      getCacheKey(GetMultiSelectCacheKey)
    ]?.numberEntries ?? 0;
  for (let index = 0; index < selection.length; ++index) {
    dispatch(setter(getCacheKey(index), selection[index]));
  }
  dispatch(
    setMultiSelectNumberEntries(
      getCacheKey(GetMultiSelectCacheKey),
      selection.length
    )
  );
  while (oldNumberEntries > selection.length) {
    dispatch(setter(getCacheKey(--oldNumberEntries), undefined));
  }
};

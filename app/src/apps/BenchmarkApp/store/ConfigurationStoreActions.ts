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

export const setDatasetId = (
  aCacheKey: StoreCacheKey,
  aDatasetId: number
): easyPrimitiveActionReturn<BenchmarkAppModel> =>
  easyPrimitiveAction<BenchmarkAppModel>({
    type: ConfigurationStoreActionTypes.SET_DATASET_ID,
    payload: aCacheKey,
    optionalPayload: aDatasetId,
  });

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
    value: T
  ) => easyPrimitiveActionReturn<BenchmarkAppModel>,
  selection: T[]
): SnowmanThunkAction<void, BenchmarkAppModel> => (dispatch) => {
  for (let index = 0; index < selection.length; ++index) {
    dispatch(setter(getCacheKey(index), selection[index]));
  }
  dispatch(
    setMultiSelectNumberEntries(
      getCacheKey(GetMultiSelectCacheKey),
      selection.length
    )
  );
};

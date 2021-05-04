import { BenchmarkAppStoreMagistrate } from 'apps/BenchmarkApp/store/BenchmarkAppStoreFactory';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import {
  GetCacheKey,
  GetMultiSelectCacheKey,
} from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';
import { ConfigurationStoreActionTypes } from 'apps/BenchmarkApp/types/ConfigurationStoreActionTypes';
import { StoreCacheKey } from 'apps/BenchmarkApp/types/StoreCacheKey';
import { getMultiSelectorItems } from 'apps/BenchmarkApp/utils/getMultiSelectorItems';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

export const setDatasetId = (
  aCacheKey: StoreCacheKey,
  aDatasetId: number | undefined
): easyPrimitiveActionReturn<BenchmarkAppModel> =>
  easyPrimitiveAction<BenchmarkAppModel>({
    type: ConfigurationStoreActionTypes.SET_DATASET_ID,
    payload: aCacheKey,
    optionalPayload: aDatasetId,
  });

export const updateDatasetSelection = (
  getCacheKey: GetCacheKey,
  selection: (number | undefined)[],
  allowMultiple = true
): SnowmanThunkAction<void, BenchmarkAppModel> => (dispatch) => {
  if (!allowMultiple) {
    const config = BenchmarkAppStoreMagistrate.getStore().getState().config;
    const currentSelection = getMultiSelectorItems(
      getCacheKey,
      config.multiSelects,
      config.datasets
    ).map(({ datasetId }) => datasetId);
    const swapIndex = currentSelection.indexOf(selection[0]);
    if (swapIndex > 0) {
      currentSelection[swapIndex] = currentSelection[0];
    }
    currentSelection[0] = selection[0];
    selection = currentSelection;
  }
  dispatch(updateSelection(getCacheKey, setDatasetId, selection));
};

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

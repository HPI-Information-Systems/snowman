import { BenchmarkAppStoreMagistrate } from 'apps/BenchmarkApp/store/BenchmarkAppStoreFactory';
import { updateSelection } from 'apps/BenchmarkApp/store/ConfigurationStore/ConfigurationStoreGenericActions';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { GetCacheKey } from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';
import { ConfigurationStoreActionTypes } from 'apps/BenchmarkApp/types/ConfigurationStoreActionTypes';
import { StoreCacheKey } from 'apps/BenchmarkApp/types/StoreCacheKey';
import { getItems } from 'apps/BenchmarkApp/utils/configurationItemGetter';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

const setDatasetId = (
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
    const currentSelection = getItems(
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

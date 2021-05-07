import { ModelOfCacheKeyBase } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
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
import { getItems } from 'apps/BenchmarkApp/utils/configurationItemGetter';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

const setSelection = <Cache extends keyof ConfigurationStoreModel>(
  aCacheKey: StoreCacheKey,
  newSelection: (ModelOfCache<Cache> | undefined)[]
): easyPrimitiveActionReturn<BenchmarkAppModel> =>
  easyPrimitiveAction<BenchmarkAppModel>({
    type: ConfigurationStoreActionTypes.SET_SELECTION,
    payload: aCacheKey,
    optionalPayload: newSelection,
  });

export const updateSelection = <Base extends StoreCacheKeyBaseEnum>({
  aCacheKey,
  newSelection,
  allowMultiple = true,
}: {
  aCacheKey: StoreCacheKey<Base>;
  newSelection: (ModelOfCacheKeyBase<Base> | undefined)[];
  allowMultiple?: boolean;
}): SnowmanThunkAction<void, BenchmarkAppModel> => (dispatch, state): void => {
  if (!allowMultiple) {
    const currentSelection = getItems(aCacheKey, state()).slice();
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
  dispatch(setSelection(aCacheKey, newSelection));
};

export const doPrimeSelection = <Base extends StoreCacheKeyBaseEnum>({
  aCacheKey,
  selectFirst,
}: {
  aCacheKey: StoreCacheKey<Base>;
  selectFirst: ModelOfCacheKeyBase<Base>;
}): void => {
  (BenchmarkAppStoreMagistrate.getStore().dispatch as BenchmarkAppDispatch)(
    updateSelection({
      aCacheKey,
      newSelection: [selectFirst],
      allowMultiple: false,
    })
  );
};

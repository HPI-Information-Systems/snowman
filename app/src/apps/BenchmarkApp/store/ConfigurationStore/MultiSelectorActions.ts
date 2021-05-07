import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import {
  MULTI_SELECTOR_INCREMENT_ID,
  MULTI_SELECTOR_START,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/multiSelect';
import { serializeCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/serializeCacheKey';
import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import { updateSelection } from 'apps/BenchmarkApp/store/ConfigurationStore/ConfigurationStoreActions';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { getSingleItem } from 'apps/BenchmarkApp/utils/configurationItemGetter';
import { NestedArray } from 'snowman-library';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';

export const selectId = <
  Content extends NestedArray<string | number | null>[] | StoreCacheKey
>(
  aCacheKey: Content,
  id: number
): Content => {
  aCacheKey = aCacheKey.slice() as Content;
  for (let index = 0; index < aCacheKey.length; ++index) {
    if (aCacheKey[index] === MULTI_SELECTOR_INCREMENT_ID) {
      aCacheKey[index] = id;
      break;
    } else if (Array.isArray(aCacheKey[index])) {
      const partialCacheKey = selectId(
        aCacheKey[index] as NestedArray<string | number | null>[],
        id
      );
      if (partialCacheKey) {
        aCacheKey[index] = partialCacheKey;
        break;
      }
    }
  }
  return aCacheKey;
};

const createCacheKey = (
  aCacheKey: StoreCacheKey<StoreCacheKeyBaseEnum.multiSelect>,
  id: number
): StoreCacheKey | undefined =>
  selectId(aCacheKey.slice(1) as StoreCacheKey, id);

export const push = (
  aCacheKey: StoreCacheKey<StoreCacheKeyBaseEnum.multiSelect>
): SnowmanThunkAction<void, BenchmarkAppModel> => (dispatch, getState) => {
  const currentConfiguration = getSingleItem(aCacheKey, getState()) ?? {
    currentCacheKeys: [],
    nextId: MULTI_SELECTOR_START,
  };
  dispatch(
    updateSelection('multiSelects', {
      aCacheKey,
      newSelection: [
        {
          ...currentConfiguration,
          currentCacheKeys: [
            ...currentConfiguration.currentCacheKeys,
            createCacheKey(aCacheKey, currentConfiguration.nextId) ?? aCacheKey,
          ],
          nextId: currentConfiguration.nextId + 1,
        },
      ],
      allowMultiple: true,
    })
  );
};

export const remove = (
  aCacheKey: StoreCacheKey<StoreCacheKeyBaseEnum.multiSelect>,
  removeCacheKey: StoreCacheKey
): SnowmanThunkAction<void, BenchmarkAppModel> => (dispatch, getState) => {
  const currentConfiguration = getSingleItem(aCacheKey, getState()) ?? {
    currentCacheKeys: [],
    nextId: 0,
  };
  dispatch(
    updateSelection('multiSelects', {
      aCacheKey,
      newSelection: [
        {
          ...currentConfiguration,
          currentCacheKeys: currentConfiguration.currentCacheKeys.filter(
            (key) =>
              serializeCacheKey(key) !== serializeCacheKey(removeCacheKey)
          ),
        },
      ],
      allowMultiple: true,
    })
  );
};

import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { serializeCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/serializeCacheKey';
import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import { updateSelection } from 'apps/BenchmarkApp/store/ConfigurationStore/ConfigurationStoreActions';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { getSingleItem } from 'apps/BenchmarkApp/utils/configurationItemGetter';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';

const createCacheKey = (
  aCacheKey: StoreCacheKey<StoreCacheKeyBaseEnum.multiSelect>,
  id: number
): StoreCacheKey => {
  return aCacheKey
    .slice(1)
    .map((item) => (typeof item === 'number' ? id : item)) as StoreCacheKey;
};

export const push = (
  aCacheKey: StoreCacheKey<StoreCacheKeyBaseEnum.multiSelect>
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
          currentCacheKeys: [
            ...currentConfiguration.currentCacheKeys,
            createCacheKey(aCacheKey, currentConfiguration.nextId),
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

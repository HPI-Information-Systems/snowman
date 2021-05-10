import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import {
  MULTI_SELECTOR_INCREMENT_ID,
  MULTI_SELECTOR_START,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/multiSelect';
import { serializeCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/serializeCacheKey';
import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import { updateSelection } from 'apps/BenchmarkApp/store/ConfigurationStore/ConfigurationStoreActions';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { MultiSelectConfigurationModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
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
): StoreCacheKey => selectId(aCacheKey.slice(1) as StoreCacheKey, id);

export const getMultiSelectConfiguration = (
  aCacheKey: StoreCacheKey<StoreCacheKeyBaseEnum.multiSelect>,
  state: BenchmarkAppModel
): MultiSelectConfigurationModel =>
  getSingleItem(aCacheKey, state) ?? {
    currentCacheKeys: [createCacheKey(aCacheKey, MULTI_SELECTOR_START)],
    nextId: MULTI_SELECTOR_START + 1,
  };

export const push = (
  aCacheKey: StoreCacheKey<StoreCacheKeyBaseEnum.multiSelect>
): SnowmanThunkAction<void, BenchmarkAppModel> => (dispatch, getState) => {
  const currentConfiguration = getMultiSelectConfiguration(
    aCacheKey,
    getState()
  );
  dispatch(
    updateSelection({
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
  const serializedRemovedCacheKey = serializeCacheKey(removeCacheKey);
  if (
    serializedRemovedCacheKey !==
    serializeCacheKey(createCacheKey(aCacheKey, MULTI_SELECTOR_START))
  ) {
    const currentConfiguration = getMultiSelectConfiguration(
      aCacheKey,
      getState()
    );
    dispatch(
      updateSelection({
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
  }
};

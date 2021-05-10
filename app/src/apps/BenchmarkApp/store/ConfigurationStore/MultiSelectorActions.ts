import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import {
  MULTI_SELECTOR_INCREMENT_ID,
  MULTI_SELECTOR_START,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/multiSelect';
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

export const resolveMultiSelectorAutoIncrements = (
  autoIncrements: number[],
  ...cacheKey: StoreCacheKey
): StoreCacheKey => {
  for (const id of autoIncrements) {
    cacheKey = selectId(cacheKey, id) ?? cacheKey;
  }
  return cacheKey;
};

export const createCacheKey = (
  aCacheKey: StoreCacheKey<
    StoreCacheKeyBaseEnum.multiSelect,
    [string, number[], ...StoreCacheKey]
  >,
  id: number
): StoreCacheKey =>
  selectId(
    resolveMultiSelectorAutoIncrements(
      ...(aCacheKey.slice(2) as [number[], ...StoreCacheKey])
    ),
    id
  );

export const getMultiSelectConfiguration = (
  aCacheKey: StoreCacheKey<StoreCacheKeyBaseEnum.multiSelect>,
  state: BenchmarkAppModel
): MultiSelectConfigurationModel =>
  getSingleItem(aCacheKey, state) ?? {
    currentIds: [MULTI_SELECTOR_START],
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
          currentIds: [
            ...currentConfiguration.currentIds,
            currentConfiguration.nextId,
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
  removeId: number
): SnowmanThunkAction<void, BenchmarkAppModel> => (dispatch, getState) => {
  if (removeId !== MULTI_SELECTOR_START) {
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
            currentIds: currentConfiguration.currentIds.filter(
              (id) => id !== removeId
            ),
          },
        ],
        allowMultiple: true,
      })
    );
  }
};

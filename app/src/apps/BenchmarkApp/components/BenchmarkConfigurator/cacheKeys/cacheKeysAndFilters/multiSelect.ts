import { getCacheKeyAndFilterUntyped } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { MakeStoreCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/types';
import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import {
  createCacheKey,
  getMultiSelectConfiguration,
} from 'apps/BenchmarkApp/store/ConfigurationStore/MultiSelectorActions';

export const MULTI_SELECTOR_START = 0;
export const MULTI_SELECTOR_INCREMENT_ID = Number.MIN_SAFE_INTEGER;

export const multiSelectCacheKeyAndFilter = MakeStoreCacheKeyAndFilter<
  StoreCacheKeyBaseEnum.multiSelect,
  [
    id: string,
    autoIncrementsInEachStoreCacheKey: number[],
    ...cacheKey: StoreCacheKey
  ],
  never,
  'multiSelects',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any[]
>({
  keyBase: StoreCacheKeyBaseEnum.multiSelect,
  targetCache: () => 'multiSelects',
  getValue: (state, cacheKey) =>
    getMultiSelectConfiguration(cacheKey, state).currentIds.map((id) =>
      getCacheKeyAndFilterUntyped(createCacheKey(cacheKey, id)).getValue(state)
    ),
  selectorItems: (state, cacheKey) =>
    getMultiSelectConfiguration(cacheKey, state)
      .currentIds.map((id) =>
        getCacheKeyAndFilterUntyped(
          createCacheKey(cacheKey, id)
        ).getSelectorItems(state)
      )
      .flat() ?? [],
  prepareSerialization: ([base, id, autoIncrements]) => [
    base,
    id,
    autoIncrements,
  ],
});

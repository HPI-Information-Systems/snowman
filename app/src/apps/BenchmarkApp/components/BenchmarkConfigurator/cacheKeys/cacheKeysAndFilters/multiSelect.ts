import { getCacheKeyAndFilterUntyped } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { MakeStoreCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/types';
import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import { SelectorItem } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorGroup/SelectorGroupProps';
import { MultiSelectConfigurationModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { getItemsUntyped } from 'apps/BenchmarkApp/utils/configurationItemGetter';

export const MULTI_SELECTOR_START = 0;
export const MULTI_SELECTOR_INCREMENT_ID = Number.MIN_SAFE_INTEGER;

export const multiSelectCacheKeyAndFilter = MakeStoreCacheKeyAndFilter<
  StoreCacheKeyBaseEnum.multiSelect,
  [...cacheKey: StoreCacheKey],
  never,
  'multiSelects',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any[]
>({
  keyBase: StoreCacheKeyBaseEnum.multiSelect,
  targetCache: () => 'multiSelects',
  getValue: (state, cacheKey) =>
    (getItemsUntyped(cacheKey, state).filter((x) => x !== undefined)[0] as
      | MultiSelectConfigurationModel
      | undefined)?.currentCacheKeys.map((cacheKey) =>
      getCacheKeyAndFilterUntyped(cacheKey).getValue(state)
    ) ?? [],
  selectorItems: (state, cacheKey) =>
    ((getItemsUntyped(cacheKey, state).filter((x) => x !== undefined)[0] as
      | MultiSelectConfigurationModel
      | undefined)?.currentCacheKeys
      .map((cacheKey) =>
        getCacheKeyAndFilterUntyped(cacheKey).getSelectorItems(state)
      )
      .flat() ?? []) as SelectorItem[],
});

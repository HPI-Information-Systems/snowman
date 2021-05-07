import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import {
  MakeStoreCacheKeyAndFilter,
  StoreCacheKey,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';

export const MULTI_SELECTOR_START = 0;
export const MULTI_SELECTOR_INCREMENT_ID = Number.MIN_SAFE_INTEGER;

export const multiSelectCacheKeyAndFilter = MakeStoreCacheKeyAndFilter<
  StoreCacheKeyBaseEnum.multiSelect,
  [...cacheKey: StoreCacheKey],
  never,
  'multiSelects'
>({
  keyBase: StoreCacheKeyBaseEnum.multiSelect,
  targetCache: () => 'multiSelects',
});

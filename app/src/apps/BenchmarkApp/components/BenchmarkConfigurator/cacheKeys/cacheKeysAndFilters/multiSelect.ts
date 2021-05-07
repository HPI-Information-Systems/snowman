import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import {
  MakeStoreCacheKeyAndFilter,
  StoreCacheKey,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';

export const multiSelectCacheKeyAndFilter = MakeStoreCacheKeyAndFilter<
  StoreCacheKeyBaseEnum.multiSelect,
  [...cacheKey: StoreCacheKey],
  never,
  'multiSelects'
>({
  keyBase: StoreCacheKeyBaseEnum.multiSelect,
  targetCache: () => 'multiSelects',
  defaultArgs: [StoreCacheKeyBaseEnum.multiSelect],
});

import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import {
  MakeStoreCacheKeyAndFilter,
  StoreCacheKey,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';

export const groupCacheKeyAndFilter = MakeStoreCacheKeyAndFilter<
  StoreCacheKeyBaseEnum.group,
  [
    autoIncrementsInEachStoreCacheKey: number[],
    ...storeCacheKeys: StoreCacheKey[]
  ],
  never
>({
  keyBase: StoreCacheKeyBaseEnum.group,
  targetCache: () => 'multiSelects',
});

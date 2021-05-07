import { Algorithm } from 'api';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { MakeStoreCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';

export const algorithmCacheKeyAndFilter = MakeStoreCacheKeyAndFilter<
  StoreCacheKeyBaseEnum.algorithm,
  [],
  Algorithm,
  'algorithms'
>({
  keyBase: StoreCacheKeyBaseEnum.algorithm,
  targetCache: () => 'algorithms',
  getEntities: (state) => state.resources.algorithms,
});

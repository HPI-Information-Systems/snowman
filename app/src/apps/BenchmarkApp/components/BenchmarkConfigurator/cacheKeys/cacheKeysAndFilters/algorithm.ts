import { Algorithm } from 'api';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { MakeStoreCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/types';
import { EntityItemType } from 'components/simple/EntityItem/EntityItemType';

export const algorithmCacheKeyAndFilter = MakeStoreCacheKeyAndFilter<
  StoreCacheKeyBaseEnum.algorithm,
  [algorithmMultiSelectId: number],
  Algorithm,
  'algorithms'
>({
  keyBase: StoreCacheKeyBaseEnum.algorithm,
  targetCache: () => 'algorithms',
  getEntities: (state) => state.resources.algorithms,
  itemType: () => EntityItemType.MATCHING_SOLUTION,
});

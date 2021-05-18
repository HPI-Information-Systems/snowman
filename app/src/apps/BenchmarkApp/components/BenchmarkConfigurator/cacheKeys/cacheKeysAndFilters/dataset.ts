import { Dataset } from 'api';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { MakeStoreCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/types';
import { EntityItemType } from 'components/simple/EntityItem/EntityItemType';

export const datasetCacheKeyAndFilter = MakeStoreCacheKeyAndFilter<
  StoreCacheKeyBaseEnum.dataset,
  [datasetMultiSelectId: number],
  Dataset,
  'datasets'
>({
  keyBase: StoreCacheKeyBaseEnum.dataset,
  targetCache: () => 'datasets',
  getEntities: (state) => state.resources.datasets,
  itemType: () => EntityItemType.DATASET,
});

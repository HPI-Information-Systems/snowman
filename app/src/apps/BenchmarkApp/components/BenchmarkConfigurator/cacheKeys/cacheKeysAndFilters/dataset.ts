import { Dataset } from 'api';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { MakeStoreCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/types';
import { fileTrayFull } from 'ionicons/icons';

export const datasetCacheKeyAndFilter = MakeStoreCacheKeyAndFilter<
  StoreCacheKeyBaseEnum.dataset,
  [datasetMultiSelectId: number],
  Dataset,
  'datasets'
>({
  keyBase: StoreCacheKeyBaseEnum.dataset,
  targetCache: () => 'datasets',
  getEntities: (state) => state.resources.datasets,
  icon: () => fileTrayFull,
});

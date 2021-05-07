import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { MakeStoreCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/types';
import { SearchableEntity } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SearchableList/types/SearchableEntity';
import { ConfigurationStoreModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import {
  analytics,
  fileTrayFull,
  flask,
  gitCommit,
  hardwareChip,
} from 'ionicons/icons';

export const filterCacheKeyAndFilter = MakeStoreCacheKeyAndFilter<
  StoreCacheKeyBaseEnum.filter,
  [targetCache: keyof ConfigurationStoreModel],
  SearchableEntity
>({
  keyBase: StoreCacheKeyBaseEnum.filter,
  targetCache: (targetCache) => targetCache,
  getEntities: (state, targetCache) => {
    switch (targetCache) {
      case 'algorithms':
        return state.resources.algorithms;
      case 'datasets':
        return state.resources.datasets;
      case 'experiments':
        return state.resources.experiments;
      case 'simFunctions':
        return state.resources.simFunctions;
      default:
        return [];
    }
  },
  icon: (targetCache) => {
    switch (targetCache) {
      case 'algorithms':
        return hardwareChip;
      case 'datasets':
        return fileTrayFull;
      case 'experiments':
        return flask;
      case 'simFunctions':
        return analytics;
      case 'simThresholds':
        return gitCommit;
      default:
        return '';
    }
  },
});

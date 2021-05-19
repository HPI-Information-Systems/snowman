import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import {
  MakeStoreCacheKeyAndFilter,
  SearchableEntity,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/types';
import { ConfigurationStoreModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { showToast } from 'apps/SnowmanApp/store/ActionLogicActions';
import { SnowmanAppDispatch } from 'apps/SnowmanApp/store/SnowmanAppStore';
import { EntityItemType } from 'components/simple/EntityItem/EntityItemType';
import { ToastType } from 'types/ToastTypes';

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
        return state.resources.algorithmsMap;
      case 'datasets':
        return state.resources.datasetsMap;
      case 'experiments':
        return state.resources.experimentsMap;
      case 'simFunctions':
        return state.resources.simFunctionsMap;
      default:
        return {};
    }
  },
  itemType: (key, targetCache) => {
    switch (targetCache) {
      case 'algorithms':
        return EntityItemType.ALGORITHM;
      case 'datasets':
        return EntityItemType.DATASET;
      case 'experiments':
        return EntityItemType.EXPERIMENT;
      case 'simFunctions':
        return EntityItemType.SIM_FUNC;
      default:
        SnowmanAppDispatch(
          showToast(
            `The target cache ${targetCache} does not belong to an entity.`,
            ToastType.Error
          )
        );
        return EntityItemType.DATASET;
    }
  },
});

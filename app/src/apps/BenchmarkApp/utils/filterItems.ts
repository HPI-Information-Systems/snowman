import { StoreCacheKey } from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';
import { ConfigurationCache } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import {
  getDefinedItems,
  getSingleItem,
} from 'apps/BenchmarkApp/utils/configurationItemGetter';

export const filterEntities = <Entity, FilterEntity>({
  entities,
  isAllowed,
  allowMultipleFilters = true,
  aFilterCacheKey,
  fallbackCacheKey,
  cache,
}: {
  entities: Entity[];
  isAllowed: (entity: Entity, filter: Set<FilterEntity>) => boolean;
  allowMultipleFilters?: boolean;
  aFilterCacheKey?: StoreCacheKey;
  fallbackCacheKey: StoreCacheKey;
  cache: ConfigurationCache<FilterEntity>;
}): Entity[] => {
  const filter = new Set<FilterEntity>(
    allowMultipleFilters
      ? getDefinedItems(aFilterCacheKey ?? fallbackCacheKey, cache)
      : ([getSingleItem(aFilterCacheKey ?? fallbackCacheKey, cache)].filter(
          (x) => x !== undefined
        ) as FilterEntity[])
  );
  return filter.size > 0 || aFilterCacheKey !== undefined
    ? entities.filter((entity) => isAllowed(entity, filter))
    : entities;
};

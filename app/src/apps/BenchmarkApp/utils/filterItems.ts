import { ConfigurationCache } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { StoreCacheKey } from 'apps/BenchmarkApp/types/StoreCacheKey';
import {
  getDefinedItems,
  getSingleItem,
} from 'apps/BenchmarkApp/utils/configurationItemGetter';

export const filterEntities = <Entity, FilterEntity>({
  entities,
  isAllowed,
  allowMultipleFilters = true,
  aFilterCacheKey,
  cache,
}: {
  entities: Entity[];
  isAllowed: (entity: Entity, filter: Set<FilterEntity>) => boolean;
  allowMultipleFilters?: boolean;
  aFilterCacheKey: StoreCacheKey;
  cache: ConfigurationCache<FilterEntity>;
}): Entity[] => {
  const filter = new Set<FilterEntity>(
    allowMultipleFilters
      ? getDefinedItems(aFilterCacheKey, cache)
      : ([getSingleItem(aFilterCacheKey, cache)].filter(
          (x) => x !== undefined
        ) as FilterEntity[])
  );
  return filter.size > 0
    ? entities.filter((entity) => isAllowed(entity, filter))
    : entities;
};

import { ConfigurationCache } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { StoreCacheKey } from 'apps/BenchmarkApp/types/StoreCacheKey';

export const getItems = <Target>(
  aCacheKey: StoreCacheKey,
  targetCache: ConfigurationCache<Target>
): (Target | undefined)[] => {
  return targetCache[aCacheKey]?.targets ?? [];
};

export const getDefinedItems = <Target>(
  aCacheKey: StoreCacheKey,
  targetCache: ConfigurationCache<Target>
): Target[] =>
  getItems(aCacheKey, targetCache).filter(
    (item) => item !== undefined
  ) as Target[];

export const getSingleItem = <Target>(
  aCacheKey: StoreCacheKey,
  targetCache: ConfigurationCache<Target>
): Target | undefined => getItems(aCacheKey, targetCache)[0];

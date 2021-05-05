import { ConfigurationCache } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { StoreCacheKey } from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';

export const getItems = <Target, Filter = undefined>(
  aCacheKey: StoreCacheKey,
  targetCache: ConfigurationCache<Target, Filter>
): (Target | undefined)[] => {
  return targetCache[aCacheKey]?.targets ?? [];
};

export const getDefinedItems = <Target, Filter = undefined>(
  aCacheKey: StoreCacheKey,
  targetCache: ConfigurationCache<Target, Filter>
): Target[] =>
  getItems(aCacheKey, targetCache).filter(
    (item) => item !== undefined
  ) as Target[];

export const getSingleItem = <Target, Filter = undefined>(
  aCacheKey: StoreCacheKey,
  targetCache: ConfigurationCache<Target, Filter>
): Target | undefined => getItems(aCacheKey, targetCache)[0];

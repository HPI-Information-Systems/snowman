import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import {
  GetCacheKey,
  GetMultiSelectCacheKey,
} from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';
import { ConfigurationCache } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';

export const getMultiSelectorItems = <Target>(
  getCacheKey: GetCacheKey,
  multiSelectCache: BenchmarkAppModel['config']['multiSelects'],
  targetCache: ConfigurationCache<Target>
): Target[] => {
  const amount =
    multiSelectCache[getCacheKey(GetMultiSelectCacheKey)]?.numberEntries ?? 0;
  const items: Target[] = [];
  for (let index = 0; index < amount; ++index) {
    const item = targetCache[getCacheKey(index)];
    if (item) {
      items.push(item);
    }
  }
  return items;
};

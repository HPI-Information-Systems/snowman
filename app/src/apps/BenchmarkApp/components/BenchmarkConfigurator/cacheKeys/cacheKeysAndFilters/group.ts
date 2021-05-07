import { getCacheKeyAndFilterUntyped } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { MakeStoreCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/types';
import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import { SelectorItem } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorGroup/SelectorGroupProps';
import { selectId } from 'apps/BenchmarkApp/store/ConfigurationStore/MultiSelectorActions';
import { ConfigurationStoreModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';

export type GroupArgsT = [
  autoIncrementsInEachStoreCacheKey: number[],
  ...storeCacheKeys: [key: string, value: StoreCacheKey][]
];

export const resolveMultiSelectorAutoIncrements = (
  ...[autoIncrements, ...cacheKeysNoAutoIncrement]: GroupArgsT
): [string, StoreCacheKey][] => {
  const cacheKeys = cacheKeysNoAutoIncrement.map(([id, cacheKey], index) => {
    for (const id of autoIncrements) {
      cacheKey = selectId(cacheKey, id) ?? cacheKey;
    }
    return [id, cacheKey] as [string, StoreCacheKey];
  });
  return cacheKeys;
};

export const groupCacheKeyAndFilter = MakeStoreCacheKeyAndFilter<
  StoreCacheKeyBaseEnum.group,
  GroupArgsT,
  never,
  keyof ConfigurationStoreModel,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Record<string, any>
>({
  keyBase: StoreCacheKeyBaseEnum.group,
  targetCache: () => 'multiSelects',
  getValue: (state, _, ...[, ...cacheKeys]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: Record<string, any> = {};
    for (const [key, cacheKey] of cacheKeys) {
      result[key] = getCacheKeyAndFilterUntyped(
        cacheKey
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ).getValue(state) as any;
    }
    return result;
  },
  selectorItems: (state, _, ...args) => {
    const result = [] as SelectorItem[];
    let first = true;
    for (const [, cacheKey] of resolveMultiSelectorAutoIncrements(...args)) {
      result.push(
        ...getCacheKeyAndFilterUntyped(
          cacheKey
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        )
          .getSelectorItems(state)
          .map(
            // eslint-disable-next-line no-loop-func
            (item): SelectorItem => {
              if (first) {
                first = false;
                return item;
              } else {
                return { ...item, indent: (item.indent ?? 0) + 1 };
              }
            }
          )
      );
    }
    return result;
  },
});

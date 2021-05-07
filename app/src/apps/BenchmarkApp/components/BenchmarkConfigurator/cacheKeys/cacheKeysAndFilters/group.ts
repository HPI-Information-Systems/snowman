import { getCacheKeyAndFilterUntyped } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { MakeStoreCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/types';
import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { ConfigurationStoreModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { RemoveFirst } from 'snowman-library';

export type GroupArgsT = [
  autoIncrementsInEachStoreCacheKey: number[],
  ...storeCacheKeys: [key: string, value: StoreCacheKey][]
];

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
  getValue: <
    Key extends StoreCacheKey<StoreCacheKeyBaseEnum.group, GroupArgsT>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResultT extends { [key in RemoveFirst<Key>[number][0]]: any }
  >(
    state: BenchmarkAppModel,
    _: Key,
    ...[, ...cacheKeys]: GroupArgsT
  ): ResultT => {
    const result = {} as ResultT;
    for (const [key, cacheKey] of cacheKeys) {
      result[key as keyof typeof result] = getCacheKeyAndFilterUntyped(
        cacheKey
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ).getValue(state) as any;
    }
    return result;
  },
});

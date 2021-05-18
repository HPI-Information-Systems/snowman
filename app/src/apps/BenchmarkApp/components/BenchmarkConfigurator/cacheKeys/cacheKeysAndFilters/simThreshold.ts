import { getCacheKeyAndFilterUntyped } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { MakeStoreCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/types';
import { gitCommit } from 'ionicons/icons';

const icon = gitCommit;

export const simThresholdCacheKeyAndFilter = MakeStoreCacheKeyAndFilter<
  StoreCacheKeyBaseEnum.similarityThreshold,
  | [datasetMultiSelectId: number, experimentMultiSelectId: number]
  | [datasetMultiSelectId: number],
  never,
  'simThresholds'
>({
  keyBase: StoreCacheKeyBaseEnum.similarityThreshold,
  targetCache: () => 'simThresholds',
  selectorItems: (state, cacheKey, ..._) =>
    (getCacheKeyAndFilterUntyped(cacheKey).getValue(state) as number[])
      .map((title) => `${title}`)
      .map((title) => ({ title, icon, indent: 0 })),
});

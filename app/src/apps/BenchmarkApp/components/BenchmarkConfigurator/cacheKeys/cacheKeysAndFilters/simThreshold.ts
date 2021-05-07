import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { MakeStoreCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/types';

export const simThresholdCacheKeyAndFilter = MakeStoreCacheKeyAndFilter<
  StoreCacheKeyBaseEnum.similarityThreshold,
  [datasetMultiSelectId: number, experimentMultiSelectId: number],
  never,
  'simThresholds'
>({
  keyBase: StoreCacheKeyBaseEnum.similarityThreshold,
  targetCache: () => 'simThresholds',
});

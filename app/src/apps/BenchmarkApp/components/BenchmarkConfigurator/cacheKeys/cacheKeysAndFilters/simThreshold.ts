import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { MakeStoreCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';

export const simThresholdCacheKeyAndFilter = MakeStoreCacheKeyAndFilter<
  StoreCacheKeyBaseEnum.similarityThreshold,
  [datasetMultiSelectId: number, experimentMultiSelectId: number],
  number,
  'simThresholds'
>({
  keyBase: StoreCacheKeyBaseEnum.similarityThreshold,
  targetCache: () => 'simThresholds',
});

import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { MakeStoreCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/types';
import { gitCommit } from 'ionicons/icons';

export const simThresholdCacheKeyAndFilter = MakeStoreCacheKeyAndFilter<
  StoreCacheKeyBaseEnum.similarityThreshold,
  [datasetMultiSelectId: number, experimentMultiSelectId: number],
  never,
  'simThresholds'
>({
  keyBase: StoreCacheKeyBaseEnum.similarityThreshold,
  targetCache: () => 'simThresholds',
  icon: () => gitCommit,
});

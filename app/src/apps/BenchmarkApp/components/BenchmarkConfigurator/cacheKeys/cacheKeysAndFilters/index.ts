import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { algorithmCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/algorithm';
import { datasetCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/dataset';
import { experimentCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/experiment';
import { filterCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/filter';
import { groundTruthCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/groundTruth';
import { multiSelectCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/multiSelect';
import { simFuntionCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/simFunction';
import { simThresholdCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/simThreshold';
import { assertType } from 'snowman-library';

export const CacheKeysAndFilters = assertType<
  {
    [Key in StoreCacheKeyBaseEnum]: unknown;
  }
>()({
  [StoreCacheKeyBaseEnum.algorithm]: algorithmCacheKeyAndFilter,
  [StoreCacheKeyBaseEnum.dataset]: datasetCacheKeyAndFilter,
  [StoreCacheKeyBaseEnum.experiment]: experimentCacheKeyAndFilter,
  [StoreCacheKeyBaseEnum.groundTruth]: groundTruthCacheKeyAndFilter,
  [StoreCacheKeyBaseEnum.filter]: filterCacheKeyAndFilter,
  [StoreCacheKeyBaseEnum.similarityFunction]: simFuntionCacheKeyAndFilter,
  [StoreCacheKeyBaseEnum.multiSelect]: multiSelectCacheKeyAndFilter,
  [StoreCacheKeyBaseEnum.similarityThreshold]: simThresholdCacheKeyAndFilter,
});

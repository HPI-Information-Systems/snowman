import {
  AlgorithmFilterModel,
  DatasetFilterModel,
  ExperimentFilterModel,
} from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { assertType } from 'snowman-library';

export enum StoreCacheKey {
  groundTruth = 'CacheKeyEnum-groundTruth',
  experiment = 'CacheKeyEnum-experiment',
  dataset = 'CacheKeyEnum-dataset',
  algorithm = 'CacheKeyEnum-algorithm',
  filter = 'CacheKeyEnum-filter',
}

export const ConfigurationFilters = assertType<
  Record<StoreCacheKey, unknown>
>()({
  [StoreCacheKey.groundTruth]: {
    forceDatasetFilter: StoreCacheKey.dataset,
    allowMultipleDatasetFilter: false,
  } as ExperimentFilterModel,
  [StoreCacheKey.experiment]: {
    forceDatasetFilter: StoreCacheKey.dataset,
    allowMultipleDatasetFilter: false,
  } as ExperimentFilterModel,
  [StoreCacheKey.dataset]: undefined as DatasetFilterModel,
  [StoreCacheKey.algorithm]: undefined as AlgorithmFilterModel,
  [StoreCacheKey.filter]: undefined,
});

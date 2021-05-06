import {
  AlgorithmFilterModel,
  DatasetFilterModel,
  ExperimentFilterModel,
  SimFunctionFilterModel,
  SimThresholdFilterModel,
} from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { assertType } from 'snowman-library';

export enum StoreCacheKey {
  groundTruth = 'CacheKeyEnum-groundTruth',
  experiment = 'CacheKeyEnum-experiment',
  dataset = 'CacheKeyEnum-dataset',
  algorithm = 'CacheKeyEnum-algorithm',
  threshold = 'CacheKeyEnum-threshold',
  simFunction = 'CacheKeyEnum-simFunction',
  filter = 'CacheKeyEnum-filter',
}

export const ConfigurationFilters = assertType<
  Record<StoreCacheKey, unknown>
>()({
  [StoreCacheKey.simFunction]: {
    forceExperimentFilter: StoreCacheKey.experiment,
    allowMultipleExperimentFilter: false,
  } as SimFunctionFilterModel,
  [StoreCacheKey.threshold]: undefined as SimThresholdFilterModel,
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

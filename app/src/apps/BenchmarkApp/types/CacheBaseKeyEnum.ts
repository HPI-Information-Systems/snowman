import { StoreCacheKey } from 'apps/BenchmarkApp/types/StoreCacheKey';

export enum StoreCacheKeysEnum {
  groundTruth = 'CacheKeyEnum-groundTruth',
  experiment = 'CacheKeyEnum-experiment',
  dataset = 'CacheKeyEnum-dataset',
  algorithm = 'CacheKeyEnum-algorithm',
}

export const fallbackFilterChacheKey = (
  baseKey: StoreCacheKey
): StoreCacheKey => `${baseKey}-filter`;

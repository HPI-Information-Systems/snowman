import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';

export type SerializedStoreCacheKey = string;

export const serializeCacheKey = (
  cacheKey: StoreCacheKey
): SerializedStoreCacheKey => JSON.stringify(cacheKey);

export const decodeCacheKey = (
  encodedCacheKey: SerializedStoreCacheKey
): StoreCacheKey => JSON.parse(encodedCacheKey);

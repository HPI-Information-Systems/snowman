import { getCacheKeyAndFilterUntyped } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys';
import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';

export type SerializedStoreCacheKey = string;

export const serializeCacheKey = (
  cacheKey: StoreCacheKey
): SerializedStoreCacheKey =>
  JSON.stringify(getCacheKeyAndFilterUntyped(cacheKey).prepareSerialization());

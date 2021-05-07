import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';

export type SerializedStoreCacheKey = string;

export const serializeCacheKey = (
  cacheKey: StoreCacheKey
): SerializedStoreCacheKey => cacheKey.map((item) => String(item)).join('#');

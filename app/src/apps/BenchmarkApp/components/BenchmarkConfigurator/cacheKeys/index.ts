import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { CacheKeysAndFilters } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters';
import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';

export const getCacheKey = <Base extends StoreCacheKeyBaseEnum>(
  base: Base,
  ...args: Parameters<typeof CacheKeysAndFilters[Base]>
): ReturnType<typeof CacheKeysAndFilters[Base]>['cacheKey'] =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ((CacheKeysAndFilters[base] as any)(...args) as ReturnType<
    typeof CacheKeysAndFilters[Base]
  >).cacheKey;

export const getCacheKeyAndFilter = <Key extends StoreCacheKey>([
  base,
  ...args
]: Key): ReturnType<typeof CacheKeysAndFilters[Key[0]]> =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (CacheKeysAndFilters[base] as any)(...args) as ReturnType<
    typeof CacheKeysAndFilters[Key[0]]
  >;

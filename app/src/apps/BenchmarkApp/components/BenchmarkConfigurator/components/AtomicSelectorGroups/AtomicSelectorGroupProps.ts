import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';

export interface AtomicSelectorGroupProps<
  Base extends StoreCacheKeyBaseEnum = StoreCacheKeyBaseEnum
> {
  cacheKey: StoreCacheKey<Base>;
  allowMultiple?: boolean;
}

import { groupCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/group';
import { AtomicSelectorGroupOwnProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroupProps';

export type GroupInputOwnProps = AtomicSelectorGroupOwnProps & {
  cacheKey: ReturnType<typeof groupCacheKeyAndFilter>['cacheKey'];
};

export type GroupInputProps = GroupInputOwnProps;

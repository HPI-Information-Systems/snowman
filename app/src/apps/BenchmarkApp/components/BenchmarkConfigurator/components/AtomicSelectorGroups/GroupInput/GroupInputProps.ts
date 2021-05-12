import { groupCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/group';
import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import { AtomicSelectorGroupOwnProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroupProps';
import { SelectorItem } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorGroup/SelectorGroupProps';

export type GroupInputOwnProps = AtomicSelectorGroupOwnProps & {
  cacheKey: ReturnType<typeof groupCacheKeyAndFilter>['cacheKey'];
  spreadItemsToParent?: boolean;
};

export interface GroupInputStateProps {
  items: SelectorItem[];
  cacheKeys: [key: StoreCacheKey, heading?: string][];
}

export type GroupInputProps = GroupInputOwnProps & GroupInputStateProps;

import { groupCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/group';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';

export interface GenericConfiguratorOwnProps {
  cacheKey: ReturnType<typeof groupCacheKeyAndFilter>['cacheKey'];
  strategyID: StrategyIDs;
}

export interface GenericConfiguratorStateProps {
  isVisible: boolean;
}

export type GenericConfiguratorProps = GenericConfiguratorOwnProps &
  GenericConfiguratorStateProps;

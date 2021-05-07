import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import { AtomicSelectorGroupOwnProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroupProps';

export type MultiSelectorOwnProps = AtomicSelectorGroupOwnProps<StoreCacheKeyBaseEnum.multiSelect>;

export interface MultiSelectorStateProps {
  cacheKeys: StoreCacheKey[];
}

export interface MultiSelectorDispatchProps {
  push(): void;
  remove(key: StoreCacheKey): void;
}

export type MultiSelectorProps = MultiSelectorOwnProps &
  MultiSelectorStateProps &
  MultiSelectorDispatchProps;

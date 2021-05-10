import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { AtomicSelectorGroupOwnProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroupProps';

export type MultiSelectorOwnProps = AtomicSelectorGroupOwnProps<StoreCacheKeyBaseEnum.multiSelect>;

export interface MultiSelectorStateProps {
  ids: number[];
}

export interface MultiSelectorDispatchProps {
  push(): void;
  remove(id: number): void;
}

export type MultiSelectorProps = MultiSelectorOwnProps &
  MultiSelectorStateProps &
  MultiSelectorDispatchProps;

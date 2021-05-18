import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { AtomicSelectorGroupProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroupProps';

export type MultiSelectorOwnProps = AtomicSelectorGroupProps<StoreCacheKeyBaseEnum.multiSelect>;

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

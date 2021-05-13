import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import { SearchableEntity } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SearchableList/types/SearchableEntity';

export interface AtomicSelectorGroupOwnProps<
  Base extends StoreCacheKeyBaseEnum = StoreCacheKeyBaseEnum
> {
  cacheKey: StoreCacheKey<Base>;
  allowMultiple?: boolean;
}

export interface AtomicSelectorGroupStateProps {
  selectedEntities: SearchableEntity[];
  entities: SearchableEntity[];
  icon: string;
}

export interface AtomicSelectorGroupDispatchProps {
  updateSelection(datasetIds: number[]): void;
}

export type AtomicSelectorGroupProps = AtomicSelectorGroupOwnProps &
  AtomicSelectorGroupStateProps &
  AtomicSelectorGroupDispatchProps;

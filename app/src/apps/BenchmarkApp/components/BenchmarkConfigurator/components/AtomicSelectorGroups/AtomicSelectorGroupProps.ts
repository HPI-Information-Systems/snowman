import { SearchableEntity } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SearchableList/types/SearchableEntity';
import { StoreCacheKey } from 'apps/BenchmarkApp/types/StoreCacheKey';

export interface FilterComponentProps<Filter> {
  filter?: Filter;
}

export interface AtomicSelectorGroupOwnProps<Filter = undefined> {
  cacheKey: StoreCacheKey;
  allowMultiple?: boolean;
  filter?: Filter;
}

export interface AtomicSelectorGroupStateProps<Filter = undefined> {
  selectedEntities: SearchableEntity[];
  entities: SearchableEntity[];
  icon: string;
  filterComponent?: (props: FilterComponentProps<Filter>) => JSX.Element;
}

export interface AtomicSelectorGroupDispatchProps {
  updateSelection(datasetIds: number[]): void;
}

export type AtomicSelectorGroupProps<
  Filter = undefined
> = AtomicSelectorGroupOwnProps<Filter> &
  AtomicSelectorGroupStateProps<Filter> &
  AtomicSelectorGroupDispatchProps;

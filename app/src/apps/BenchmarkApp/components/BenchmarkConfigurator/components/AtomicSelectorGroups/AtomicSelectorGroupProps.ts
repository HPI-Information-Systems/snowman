import { SearchableEntity } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SearchableList/types/SearchableEntity';
import { StoreCacheKey } from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';

export interface FilterComponentProps<Filter> {
  filter?: Filter;
}

export interface AtomicSelectorGroupOwnProps {
  cacheKey: StoreCacheKey;
  allowMultiple?: boolean;
}

export interface AtomicSelectorGroupStateProps<Filter = undefined> {
  selectedEntities: SearchableEntity[];
  entities: SearchableEntity[];
  icon: string;
  filter?: Filter;
  filterComponent?: (props: FilterComponentProps<Filter>) => JSX.Element;
}

export interface AtomicSelectorGroupDispatchProps {
  updateSelection(datasetIds: number[]): void;
}

export type AtomicSelectorGroupProps<
  Filter = undefined
> = AtomicSelectorGroupOwnProps &
  AtomicSelectorGroupStateProps<Filter> &
  AtomicSelectorGroupDispatchProps;

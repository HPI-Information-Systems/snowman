import { SearchableEntity } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SearchableList/types/SearchableEntity';
import { GenericStoreComponentProps } from 'components/generics/GenericStoreComponent/GenericStoreComponentProps';
import { IonChangeEvent } from 'types/IonChangeEvent';

export interface SearchableListOwnProps extends GenericStoreComponentProps {
  entities: SearchableEntity[];
  icon: string;
  updateSelection: (selectedEntities: number[]) => void;
  selectedEntities: number[];
  allowMultiple?: boolean;
}

export interface SearchableListStateProps {
  searchString: string;
}

export interface SearchableListDispatchProps {
  changeSearchString(anEvent: IonChangeEvent): void;
}

export type SearchableListProps = SearchableListOwnProps &
  SearchableListStateProps &
  SearchableListDispatchProps;

import { SearchableEntity } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SearchableList/types/SearchableEntity';
import { IonChangeEvent } from 'types/IonChangeEvent';
import { GenericStoreComponentProps } from 'utils/GenericStoreComponentFactory';

export interface SearchableListOwnProps extends GenericStoreComponentProps {
  entities: SearchableEntity[];
  icon: string;
  updateSelection: (selectedEntities: number[]) => void;
  selectedEntities: number[];
  allowMultiple?: boolean;
  children?: JSX.Element | JSX.Element[];
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

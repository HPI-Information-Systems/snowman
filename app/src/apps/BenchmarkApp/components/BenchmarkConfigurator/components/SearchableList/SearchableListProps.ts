import { SearchableEntity } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SearchableList/types/SearchableEntity';

export interface SearchableListOwnProps {
  entities: SearchableEntity[];
  icon: string;
  updateSelection: (selectedEntities: number[]) => void;
  selectedEntities: number[];
  allowMultiple?: boolean;
}

export type SearchableListProps = SearchableListOwnProps;

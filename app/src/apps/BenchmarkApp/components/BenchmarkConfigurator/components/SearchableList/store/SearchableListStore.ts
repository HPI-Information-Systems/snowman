import SearchableListReducer from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SearchableList/store/SearchableListReducer';
import { SearchableListModel } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SearchableList/types/SearchableListModel';
import { StoreMagistrate } from 'utils/storeFactory';

export const SearchableListStoreMagistrate = new StoreMagistrate<SearchableListModel>(
  'SearchableList',
  SearchableListReducer
);

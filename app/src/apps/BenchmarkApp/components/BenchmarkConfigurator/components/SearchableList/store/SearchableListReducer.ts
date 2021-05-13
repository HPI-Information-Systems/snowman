import { SearchableListActionTypes } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SearchableList/types/SearchableListActionTypes';
import { SearchableListModel } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SearchableList/types/SearchableListModel';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: SearchableListModel = {
  searchString: '',
};

const SearchableListReducer = (
  state: SearchableListModel = initialState,
  action: SnowmanAction
): SearchableListModel => {
  switch (action.type) {
    case SearchableListActionTypes.SET_SEARCH_STRING:
      return {
        ...state,
        searchString: action.payload as string,
      };
    case SearchableListActionTypes.RESET_SEARCH_STRING:
      return {
        ...state,
        searchString: '',
      };
    default:
      return state;
  }
};

export default SearchableListReducer;

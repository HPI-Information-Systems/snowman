import { SearchableListActionTypes } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SearchableList/types/SearchableListActionTypes';
import { SearchableListModel } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SearchableList/types/SearchableListModel';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

export const setSearchString = (
  aSearchString: string
): easyPrimitiveActionReturn<SearchableListModel> =>
  easyPrimitiveAction<SearchableListModel>({
    type: SearchableListActionTypes.SET_SEARCH_STRING,
    payload: aSearchString,
  });

export const resetSearchString = (): easyPrimitiveActionReturn<SearchableListModel> =>
  easyPrimitiveAction<SearchableListModel>({
    type: SearchableListActionTypes.RESET_SEARCH_STRING,
    // reducer ignores payload
    payload: false,
  });

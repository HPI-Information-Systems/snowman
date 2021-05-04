import SearchableListView from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SearchableList/SearchableList.View';
import {
  SearchableListDispatchProps,
  SearchableListOwnProps,
  SearchableListStateProps,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SearchableList/SearchableListProps';
import { setSearchString } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SearchableList/store/SearchableListActions';
import { SearchableListStoreMagistrate } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SearchableList/store/SearchableListStore';
import { SearchableListModel } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SearchableList/types/SearchableListModel';
import GenericStoreComponentFactory from 'components/generics/GenericStoreComponent/GenericStoreComponent';
import { connect } from 'react-redux';
import { IonChangeEvent } from 'types/IonChangeEvent';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: SearchableListModel
): SearchableListStateProps => ({
  searchString: state.searchString,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<SearchableListModel>
): SearchableListDispatchProps => ({
  changeSearchString(anEvent: IonChangeEvent) {
    dispatch(setSearchString(anEvent.detail.value ?? ''));
  },
});

const SearchableList = GenericStoreComponentFactory<
  SearchableListModel,
  SearchableListOwnProps
>(
  SearchableListStoreMagistrate,
  connect(mapStateToProps, mapDispatchToProps)(SearchableListView)
);

export default SearchableList;

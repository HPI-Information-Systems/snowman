import SideMenuView from 'components/SideMenu/SideMenu.View';
import {
  CategoryItem,
  SideMenuCategory,
  SideMenuDispatchProps,
  SideMenuStateProps,
} from 'components/SideMenu/SideMenuProps';
import { skull } from 'ionicons/icons';
import { difference, sortBy } from 'lodash';
import { connect } from 'react-redux';
import { navigateTo } from 'store/actions/RouterStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';
import { ViewMetaInformationCollection } from 'store/reducers/rootReducer';
import { ViewIDs } from 'store/reducers/rootReducer';
import { menuCategories } from 'types/MenuCategories';
import { ViewMetaInformation } from 'types/ViewMetaInformation';
import { getExperimentNameFromId } from 'utils/experimentsHelpers';

const getSelectedOptionsFromPathMapper = (
  aViewMetaInfo: ViewMetaInformation,
  state: Store
): string[] => {
  switch (aViewMetaInfo.key) {
    case ViewIDs.DATASETS: {
      if (state.DatasetsStore.selectedDataset === null) return [];
      return [state.DatasetsStore.selectedDataset.name];
    }
    case ViewIDs.EXPERIMENTS:
      return state.ExperimentsStore.selectedExperiments.map(
        (anExperimentId: number, index: number): string =>
          `${index + 1}. ${getExperimentNameFromId(
            anExperimentId,
            state.ExperimentsStore.experiments
          )}`
      );
    default:
      return [];
  }
};

const getCategoryItemFromViewMetaInfo = (
  aViewMetaInfo: ViewMetaInformation,
  state: Store
): CategoryItem => ({
  name: aViewMetaInfo.menuName,
  key: aViewMetaInfo.key,
  menuIcon: aViewMetaInfo.menuIcon ?? skull,
  couldEnter: aViewMetaInfo.accessGuard(state),
  selectedOptions: getSelectedOptionsFromPathMapper(aViewMetaInfo, state),
  isActive: aViewMetaInfo.key === state.RenderLogicStore.currentViewID,
});

const getCategories = (): string[] =>
  difference(Object.values(menuCategories), [menuCategories.UNCATEGORIZED]);

const getViewMetaInfoOfCategory = (aCategory: string): ViewMetaInformation[] =>
  sortBy(
    ViewMetaInformationCollection.filter(
      (aViewMetaInfo: ViewMetaInformation): boolean =>
        aViewMetaInfo.shouldShowInMenu &&
        aViewMetaInfo.menuCategory === aCategory
    ),
    ['menuSortKey', 'key']
  );

const mapStateToProps = (state: Store): SideMenuStateProps => ({
  categoryStructure: getCategories().map(
    (aCategory: string): SideMenuCategory => ({
      name: aCategory,
      categoryItems: getViewMetaInfoOfCategory(aCategory).map(
        (aPathMapper: ViewMetaInformation): CategoryItem =>
          getCategoryItemFromViewMetaInfo(aPathMapper, state)
      ),
    })
  ),
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): SideMenuDispatchProps => ({
  enterView(aViewId: ViewIDs): void {
    dispatch(navigateTo(aViewId));
  },
});

const SideMenu = connect(mapStateToProps, mapDispatchToProps)(SideMenuView);

export default SideMenu;

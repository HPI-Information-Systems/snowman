import SideMenuView from 'components/SideMenu/SideMenu.View';
import {
  CategoryItem,
  SideMenuCategory,
  SideMenuProps,
} from 'components/SideMenu/SideMenuProps';
import { skull } from 'ionicons/icons';
import { difference, sortBy } from 'lodash';
import { connect } from 'react-redux';
import { Store } from 'store/models';
import { getExperimentNameFromId } from 'utils/experimentsHelpers';
import {
  getPathResolution,
  IPathMapper,
  menuCategories,
  navigateTo,
  pathMapperKeys,
} from 'utils/pathHandlers';

const getSelectedOptionsFromPathMapper = (
  aPathMapper: IPathMapper,
  state: Store
): string[] => {
  switch (aPathMapper.key) {
    case pathMapperKeys.DATASETS: {
      if (state.DatasetsStore.selectedDataset === null) return [];
      return [state.DatasetsStore.selectedDataset.name];
    }
    case pathMapperKeys.EXPERIMENTS:
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

const getCategoryItemFromPathMapper = (
  aPathMapper: IPathMapper,
  state: Store
): CategoryItem => ({
  name: aPathMapper.key,
  key: aPathMapper.key,
  menuIcon: aPathMapper.menuIcon ?? skull,
  couldEnter: aPathMapper.accessGuard(state),
  enterItem() {
    navigateTo(aPathMapper.path);
  },
  selectedOptions: getSelectedOptionsFromPathMapper(aPathMapper, state),
});

const getCategories = (): string[] =>
  difference(Object.values(menuCategories), [menuCategories.UNCATEGORIZED]);

const getPathMappersOfCategory = (aCategory: string): IPathMapper[] =>
  sortBy(
    getPathResolution().filter(
      (aPathMapper: IPathMapper): boolean =>
        aPathMapper.shouldShowInMenu && aPathMapper.menuCategory === aCategory
    ),
    ['menuSortKey', 'key']
  );

const mapStateToProps = (state: Store): SideMenuProps => ({
  categoryStructure: getCategories().map(
    (aCategory: string): SideMenuCategory => ({
      name: aCategory,
      categoryItems: getPathMappersOfCategory(aCategory).map(
        (aPathMapper: IPathMapper): CategoryItem =>
          getCategoryItemFromPathMapper(aPathMapper, state)
      ),
    })
  ),
});

const SideMenu = connect(mapStateToProps)(SideMenuView);

export default SideMenu;

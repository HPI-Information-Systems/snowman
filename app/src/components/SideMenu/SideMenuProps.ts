import { SelectedOptionItem } from 'types/SelectedOptionItem';
import { ViewIDs } from 'types/ViewIDs';

export interface CategoryItem {
  name: string;
  key: ViewIDs;
  couldEnter: boolean;
  selectedOptions: SelectedOptionItem[];
  menuIcon: string;
  isActive: boolean;
}

export interface SideMenuCategory {
  name: string;
  categoryItems: CategoryItem[];
}

export interface SideMenuOwnProps {
  contentId: string;
}

export interface SideMenuDispatchProps {
  enterView(aViewId: ViewIDs): void;
}

export interface SideMenuStateProps {
  categoryStructure: SideMenuCategory[];
}

export type SideMenuProps = SideMenuOwnProps &
  SideMenuStateProps &
  SideMenuDispatchProps;

import { ViewIDs } from 'store/reducers/rootReducer';

export interface CategoryItem {
  name: string;
  key: ViewIDs;
  couldEnter: boolean;
  selectedOptions: string[];
  menuIcon: string;
  isActive: boolean;
}

export interface SideMenuCategory {
  name: string;
  categoryItems: CategoryItem[];
}

export interface SideMenuDispatchProps {
  enterView(aViewId: ViewIDs): void;
}

export interface SideMenuStateProps {
  categoryStructure: SideMenuCategory[];
}

export type SideMenuProps = SideMenuStateProps & SideMenuDispatchProps;

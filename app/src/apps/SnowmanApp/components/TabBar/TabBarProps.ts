import { ViewIDs } from 'types/ViewIDs';

export interface TabBarDispatchProps {
  openSubApp(viewID: ViewIDs): void;
}

export interface TabBarStateProps {
  activeSubApp: ViewIDs;
  showTabBar: boolean;
}

export type TabBarProps = TabBarDispatchProps & TabBarStateProps;

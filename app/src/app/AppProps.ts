import { ViewIDs } from 'types/ViewIDs';

export interface DefaultAppDispatchProps {
  loadInitialState(): void;
}

export interface DefaultAppStateProps {
  currentViewID: ViewIDs;
  showSideMenu: boolean;
}

export type DefaultAppProps = DefaultAppStateProps & DefaultAppDispatchProps;

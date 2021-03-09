import { ViewIDs } from 'types/ViewIDs';

export interface AppDispatchProps {
  loadInitialState(): void;
}

export interface AppStateProps {
  currentViewId: ViewIDs;
}

export type AppProps = AppStateProps & AppDispatchProps;

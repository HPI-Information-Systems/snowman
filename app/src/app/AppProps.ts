import { ViewIDs } from 'store/reducers/rootReducer';

export interface AppDispatchProps {
  loadInitialState(): void;
}

export interface AppStateProps {
  currentViewId: ViewIDs;
}

export type AppProps = AppStateProps & AppDispatchProps;

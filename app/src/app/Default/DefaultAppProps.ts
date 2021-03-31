import { ViewIDs } from 'types/ViewIDs';

export interface DefaultAppDispatchProps {
  loadInitialState(): void;
}

export interface DefaultAppStateProps {
  currentViewId: ViewIDs;
}

export type DefaultAppProps = DefaultAppStateProps & DefaultAppDispatchProps;

import { ToastConfiguration } from 'types/ToastConfiguration';

export interface AppDispatchProps {
  loadInitialState(): void;
}

export interface AppStateProps {
  toastStack: ToastConfiguration[];
}

export type AppProps = AppDispatchProps & AppStateProps;

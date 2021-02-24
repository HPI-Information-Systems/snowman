export interface AppDispatchProps {
  loadInitialState(): void;
}

export type AppProps = AppDispatchProps;

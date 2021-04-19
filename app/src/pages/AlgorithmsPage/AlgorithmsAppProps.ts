import { Algorithm } from 'api';

export interface AlgorithmsAppStateProps {
  algorithms: Algorithm[];
}

export interface AlgorithmsAppDispatchProps {
  loadAlgorithms(): void;
}

export type AlgorithmsAppProps = AlgorithmsAppStateProps &
  AlgorithmsAppDispatchProps;

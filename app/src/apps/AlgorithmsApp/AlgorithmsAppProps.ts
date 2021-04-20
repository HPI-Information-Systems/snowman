import { Algorithm } from 'api';

export interface AlgorithmsAppOwnProps {
  algorithms: Algorithm[];
}

export interface AlgorithmsAppDispatchProps {
  addAlgorithm(): void;
}

export type AlgorithmsAppProps = AlgorithmsAppOwnProps &
  AlgorithmsAppDispatchProps;

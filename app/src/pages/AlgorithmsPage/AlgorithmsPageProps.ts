import { Algorithm } from 'api';

export interface AlgorithmsPageStateProps {
  algorithms: Algorithm[];
}

export interface AlgorithmsDispatchProps {
  loadAlgorithms(): void;
}

export type AlgorithmsPageProps = AlgorithmsPageStateProps &
  AlgorithmsDispatchProps;

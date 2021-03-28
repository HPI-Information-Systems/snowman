import { Algorithm } from 'api';

export interface AlgorithmCardOwnProps {
  algorithm: Algorithm;
}

export interface AlgorithmCardDispatchProps {
  deleteAlgorithm(): void;
  editAlgorithm(): void;
}

export type AlgorithmCardProps = AlgorithmCardOwnProps &
  AlgorithmCardDispatchProps;

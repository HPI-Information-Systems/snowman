import { Algorithm } from 'api';

export interface AlgorithmCardOwnProps {
  algorithm: Algorithm;
}

export interface AlgorithmCardStateProps {
  isSelected: boolean;
}

export interface AlgorithmCardDispatchProps {
  selectAlgorithm(): void;
  deleteAlgorithm(): void;
  editAlgorithm(): void;
}

export type AlgorithmCardProps = AlgorithmCardOwnProps &
  AlgorithmCardStateProps &
  AlgorithmCardDispatchProps;

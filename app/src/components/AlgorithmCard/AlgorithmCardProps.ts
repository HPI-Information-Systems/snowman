import { Algorithm } from 'api';

export interface AlgorithmCardOwnProps {
  algorithm: Algorithm;
}
export interface AlgorithmCardDispatchProps {
  deleteAlgorithm(): void;
}

export type AlgorithmCardProps = AlgorithmCardOwnProps &
  AlgorithmCardDispatchProps;

import { AlgorithmValues } from './AlgorithmValues';

export interface AddAlgorithmRequest {
  algorithm: AlgorithmValues;
}

export interface DeleteAlgorithmRequest {
  algorithmId: number;
}

export interface GetAlgorithmRequest {
  algorithmId: number;
}

export interface SetAlgorithmRequest {
  algorithmId: number;
  algorithm: AlgorithmValues;
}

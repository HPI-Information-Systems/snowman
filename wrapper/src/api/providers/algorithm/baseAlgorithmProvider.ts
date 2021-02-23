import { Algorithm, AlgorithmId, AlgorithmValues } from '../../server/types';

export abstract class BaseAlgorithmProvider {
  abstract listAlgorithms(): Algorithm[];
  abstract addAlgorithm(algorithm: AlgorithmValues): AlgorithmId;
  abstract getAlgorithm(id: AlgorithmId): Algorithm;
  abstract setAlgorithm(id: AlgorithmId, algorithm: AlgorithmValues): void;
  abstract deleteAlgorithm(id: AlgorithmId): void;
}

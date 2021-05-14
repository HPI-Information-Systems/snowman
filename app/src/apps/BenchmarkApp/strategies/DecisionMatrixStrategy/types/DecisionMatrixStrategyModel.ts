import { Algorithm } from 'api';

export interface DecisionMatrixStrategyModel {
  isValidConfig: boolean;
  selectedAlgorithms: Algorithm[];
}

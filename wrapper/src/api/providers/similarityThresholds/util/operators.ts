import { SimilarityThresholdOperatorOperatorEnum } from '../../../server/types';

const operators: [SimilarityThresholdOperatorOperatorEnum, string][] = [
  [SimilarityThresholdOperatorOperatorEnum.Add, '+'],
  [SimilarityThresholdOperatorOperatorEnum.Divide, '/'],
  [SimilarityThresholdOperatorOperatorEnum.Multiply, '*'],
  [SimilarityThresholdOperatorOperatorEnum.Subtract, '-'],
];
export const enumToOperator = new Map(operators);
export const operatorToEnum = new Map(
  operators.map(([encoded, operator]) => [operator, encoded])
);

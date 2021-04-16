import { SimilarityThresholdFunctionOperatorOperatorEnum } from '../../../server/types';

const operators: [SimilarityThresholdFunctionOperatorOperatorEnum, string][] = [
  [SimilarityThresholdFunctionOperatorOperatorEnum.Add, '+'],
  [SimilarityThresholdFunctionOperatorOperatorEnum.Divide, '/'],
  [SimilarityThresholdFunctionOperatorOperatorEnum.Multiply, '*'],
  [SimilarityThresholdFunctionOperatorOperatorEnum.Subtract, '-'],
];
export const enumToOperator = new Map(operators);
export const operatorToEnum = new Map(
  operators.map(([encoded, operator]) => [operator, encoded])
);

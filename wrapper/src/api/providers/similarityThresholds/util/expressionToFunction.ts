import { experimentCustomColumnPrefix } from '../../../database/schemas';
import {
  SimilarityThresholdFunctionValues,
  SimilarityThresholdFunctionValuesTypeEnum,
} from '../../../server/types';
import { findClosingBracket } from '../../../tools/findClosingBracket';
import { operatorToEnum } from './operators';

function operatorIndex(expression: string): number {
  if (expression[1] === '"') {
    return expression.indexOf('"', 2) + 1;
  } else if (expression[1] === '(') {
    return findClosingBracket(expression, 2) + 1;
  } else {
    throw new Error(
      `Error while parsing expression ${expression}. Unknown left hand operator.`
    );
  }
}

function expressionToOperator(
  expression: string
): SimilarityThresholdFunctionValues {
  const index = operatorIndex(expression);
  const operator = operatorToEnum.get(expression[index]);
  if (!operator) {
    throw new Error(
      `Unknown operator ${expression[index]} in expression ${expression}.`
    );
  }
  return {
    type: SimilarityThresholdFunctionValuesTypeEnum.Operator,
    operator: {
      left: expressionToFunction(expression.substring(1, index)),
      operator,
      right: expressionToFunction(
        expression.substring(index + 1, expression.length - 1)
      ),
    },
  };
}

function expressionToThreshold(
  expression: string
): SimilarityThresholdFunctionValues {
  return {
    type: SimilarityThresholdFunctionValuesTypeEnum.SimilarityThreshold,
    similarityThreshold: expression.substring(
      1 + experimentCustomColumnPrefix.length,
      expression.length - 1
    ),
  };
}

export function expressionToFunction(
  expression: string
): SimilarityThresholdFunctionValues {
  if (expression.startsWith('(')) {
    return expressionToOperator(expression);
  } else {
    return expressionToThreshold(expression);
  }
}

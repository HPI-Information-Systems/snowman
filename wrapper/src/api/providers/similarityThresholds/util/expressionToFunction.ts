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
    const index = expression.indexOf('/*END*/');
    if (index === -1) {
      throw new Error(
        `Error while parsing expression ${expression}. Unknown left hand operator.`
      );
    } else {
      return index + 7;
    }
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

function expressionToConstant(
  expression: string
): SimilarityThresholdFunctionValues {
  return {
    type: SimilarityThresholdFunctionValuesTypeEnum.Constant,
    constant: parseFloat(expression.substring(0, expression.length - 7)),
  };
}

export function expressionToFunction(
  expression: string
): SimilarityThresholdFunctionValues {
  if (expression.startsWith('(')) {
    return expressionToOperator(expression);
  } else if (expression.startsWith('"')) {
    return expressionToThreshold(expression);
  } else {
    return expressionToConstant(expression);
  }
}

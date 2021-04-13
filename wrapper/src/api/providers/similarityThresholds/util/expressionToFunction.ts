import { experimentCustomColumnPrefix } from '../../../database/schemas';
import {
  SimilarityThresholdFunctionOperatorOperatorEnum,
  SimilarityThresholdFunctionUnaryOperatorOperatorEnum,
  SimilarityThresholdFunctionValues,
  SimilarityThresholdFunctionValuesTypeEnum,
} from '../../../server/types';
import { findClosingBracket } from '../../../tools/findClosingBracket';
import { operatorToEnum } from './operators';

function nextExpression(expression: string): [string, string] {
  if (!expression.startsWith('/*START_')) {
    throw new Error('Invalid expression: No start index');
  } else {
    const expressionStartIndex = expression.indexOf('*/');
    const expressionIndex = parseInt(
      expression.substring(8, expressionStartIndex)
    );
    const endMarker = `/*END_${expressionIndex}*/`;
    const expressionStopIndex = expression.indexOf(endMarker);
    return [
      expression.substring(expressionStartIndex + 2, expressionStopIndex),
      expression.substring(expressionStopIndex + endMarker.length),
    ];
  }
}

function extractBuiltIn(expression: string): [string, string] {
  const splitIndex = expression.indexOf('(');
  const endIndex = findClosingBracket(expression, splitIndex);
  return [
    expression.substring(0, splitIndex).toUpperCase(),
    expression.substring(splitIndex + 1, endIndex),
  ];
}

function expressionToBasicOperator(
  expression: string
): SimilarityThresholdFunctionValues {
  const [left, rest] = nextExpression(
    expression.substring(1, expression.length - 1)
  );
  const operator = operatorToEnum.get(rest[0]);
  if (!operator) {
    throw new Error(`Unknown operator ${rest[0]} in expression ${expression}.`);
  }
  return {
    type: SimilarityThresholdFunctionValuesTypeEnum.Operator,
    operator: {
      left: expressionToFunction(left, false),
      operator,
      right: expressionToFunction(rest.substring(1), true),
    },
  };
}

function expressionToAdvancedOperator(
  expression: string
): SimilarityThresholdFunctionValues {
  const [func, params] = extractBuiltIn(expression);
  const [left, rest] = nextExpression(params);
  return {
    type: SimilarityThresholdFunctionValuesTypeEnum.Operator,
    operator: {
      left: expressionToFunction(left, false),
      operator: func as SimilarityThresholdFunctionOperatorOperatorEnum,
      right: expressionToFunction(rest.substring(1), true),
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
    constant: parseFloat(expression),
  };
}

function expressionToUnaryOperator(
  expression: string
): SimilarityThresholdFunctionValues {
  const [func, param] = extractBuiltIn(expression);
  return {
    type: SimilarityThresholdFunctionValuesTypeEnum.UnaryOperator,
    unaryOperator: {
      operator: func as SimilarityThresholdFunctionUnaryOperatorOperatorEnum,
      func: expressionToFunction(param),
    },
  };
}

export function expressionToFunction(
  expression: string,
  unwrapExpression = true
): SimilarityThresholdFunctionValues {
  if (unwrapExpression) {
    [expression] = nextExpression(expression);
  }
  if (expression.startsWith('/*BASIC_OPERATOR*/')) {
    return expressionToBasicOperator(expression.substring(18));
  } else if (expression.startsWith('/*ADVANCED_OPERATOR*/')) {
    return expressionToAdvancedOperator(expression.substring(21));
  } else if (expression.startsWith('/*UNARY_OPERATOR*/')) {
    return expressionToUnaryOperator(expression.substring(18));
  } else if (expression.startsWith('/*THRESHOLD*/')) {
    return expressionToThreshold(expression.substring(13));
  } else if (expression.startsWith('/*CONSTANT*/')) {
    return expressionToConstant(expression.substring(12));
  } else {
    throw new Error('Unknown expression type: ' + expression);
  }
}

import { experimentCustomColumnPrefix } from '../../../database/schemas';
import { escapeColumnName } from '../../../database/tools/escapeColumnNames';
import { Columns } from '../../../database/tools/types';
import {
  SimilarityThresholdFunctionDefinition,
  SimilarityThresholdFunctionDefinitionTypeEnum,
} from '../../../server/types';
import { enumToOperator } from './operators';

function thresholdToExpression(
  threshold: SimilarityThresholdFunctionDefinition['similarityThreshold'],
  columns: Columns
): string {
  if (threshold) {
    const column = escapeColumnName(threshold, experimentCustomColumnPrefix);
    if (column in columns) {
      return `/*THRESHOLD*/"${column}"`;
    } else {
      throw new Error(
        `Similarity threshold function has non existent similarity threhold ${threshold}`
      );
    }
  } else {
    throw new Error(
      `Similarity threshold function type similarity threshold is missing required property similarityThreshold.`
    );
  }
}

function operatorToExpression(
  operator: SimilarityThresholdFunctionDefinition['operator'],
  columns: Columns,
  expression: { index: number }
): string {
  if (operator) {
    const operatorString = enumToOperator.get(operator.operator);
    const left = functionToExpression(operator.left, columns, expression);
    const right = functionToExpression(operator.right, columns, expression);
    if (operatorString) {
      return '/*BASIC_OPERATOR*/(' + left + operatorString + right + ')';
    } else {
      return `/*ADVANCED_OPERATOR*/${operator.operator.toLowerCase()}(${left},${right})`;
    }
  } else {
    throw new Error(
      `Similarity threshold function operator is missing required property operator.`
    );
  }
}

function constantToExpression(
  constant: SimilarityThresholdFunctionDefinition['constant']
): string {
  if (typeof constant === 'number') {
    return `/*CONSTANT*/${constant}`;
  } else {
    throw new Error(
      'Similarity threshold function constant is missing required property constant.'
    );
  }
}

function unaryOperatorToExpression(
  unaryOperator: SimilarityThresholdFunctionDefinition['unaryOperator'],
  columns: Columns,
  expression: { index: number }
): string {
  if (unaryOperator) {
    return `/*UNARY_OPERATOR*/${unaryOperator.operator.toLowerCase()}(${functionToExpression(
      unaryOperator.func,
      columns,
      expression
    )})`;
  } else {
    throw new Error(
      'Similarity threshold function unary operator is missing required property unaryOperator.'
    );
  }
}

function wrapExpression(
  expressionString: string,
  expression: { index: number }
): string {
  expression.index++;
  return `/*START_${expression.index}*/${expressionString}/*END_${expression.index}*/`;
}

export function functionToExpression(
  similarityThresholdFunction: SimilarityThresholdFunctionDefinition,
  columns: Columns,
  expression: { index: number } = { index: 0 }
): string {
  let expressionStr: string;
  switch (similarityThresholdFunction.type) {
    case SimilarityThresholdFunctionDefinitionTypeEnum.SimilarityThreshold:
      expressionStr = thresholdToExpression(
        similarityThresholdFunction.similarityThreshold,
        columns
      );
      break;
    case SimilarityThresholdFunctionDefinitionTypeEnum.Operator:
      expressionStr = operatorToExpression(
        similarityThresholdFunction.operator,
        columns,
        expression
      );
      break;
    case SimilarityThresholdFunctionDefinitionTypeEnum.Constant:
      expressionStr = constantToExpression(
        similarityThresholdFunction.constant
      );
      break;
    case SimilarityThresholdFunctionDefinitionTypeEnum.UnaryOperator:
      expressionStr = unaryOperatorToExpression(
        similarityThresholdFunction.unaryOperator,
        columns,
        expression
      );
      break;
    default:
      throw new Error(
        `Unknown similarity threshold function type: ${similarityThresholdFunction.type}`
      );
  }
  return wrapExpression(expressionStr, expression);
}

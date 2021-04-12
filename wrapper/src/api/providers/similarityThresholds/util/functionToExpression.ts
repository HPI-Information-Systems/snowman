import { experimentCustomColumnPrefix } from '../../../database/schemas';
import { escapeColumnName } from '../../../database/tools/escapeColumnNames';
import { Columns } from '../../../database/tools/types';
import {
  SimilarityThresholdFunctionValues,
  SimilarityThresholdFunctionValuesTypeEnum,
} from '../../../server/types';
import { enumToOperator } from './operators';

function thresholdToExpression(
  threshold: SimilarityThresholdFunctionValues['similarityThreshold'],
  columns: Columns
): string {
  if (threshold) {
    const column = escapeColumnName(threshold, experimentCustomColumnPrefix);
    if (column in columns) {
      return `"${column}"`;
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
  operator: SimilarityThresholdFunctionValues['operator'],
  columns: Columns
): string {
  if (operator) {
    const operatorString = enumToOperator.get(operator.operator);
    if (!operatorString) {
      throw new Error(
        'Unknown operator in similarity threshold function: ' + operator
      );
    }
    return (
      '(' +
      functionToExpression(operator.left, columns) +
      operatorString +
      functionToExpression(operator.right, columns) +
      ')'
    );
  } else {
    throw new Error(
      `Similarity threshold function operator is missing required property operator.`
    );
  }
}

export function functionToExpression(
  similarityThresholdFunction: SimilarityThresholdFunctionValues,
  columns: Columns
): string {
  switch (similarityThresholdFunction.type) {
    case SimilarityThresholdFunctionValuesTypeEnum.SimilarityThreshold:
      return thresholdToExpression(
        similarityThresholdFunction.similarityThreshold,
        columns
      );
    case SimilarityThresholdFunctionValuesTypeEnum.Operator:
      return operatorToExpression(
        similarityThresholdFunction.operator,
        columns
      );
    default:
      throw new Error(
        `Unknown similarity threshold function type: ${similarityThresholdFunction.type}`
      );
  }
}

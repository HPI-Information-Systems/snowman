import {
  experimentCustomColumnPrefix,
  tableSchemas,
} from '../../../database/schemas';
import { escapeColumnName } from '../../../database/tools/escapeColumnNames';
import { ColumnValues } from '../../../database/tools/types';
import {
  ExperimentId,
  SimilarityThresholdFunction,
  SimilarityThresholdFunctionValues,
  SimilarityThresholdFunctionValuesTypeEnum,
  SimilarityThresholdOperatorOperatorEnum,
} from '../../../server/types';

type StoredSimilarityThresholdFunction = ColumnValues<
  typeof tableSchemas['meta']['similarityfunction']['columns']
>;

export class SimilarityThresholdFunctionConverter {
  convertSimilarityThresholdFunctionToExpression(
    similarityThresholdFunction: SimilarityThresholdFunctionValues
  ): string {
    switch (similarityThresholdFunction.type) {
      case SimilarityThresholdFunctionValuesTypeEnum.SimilarityThreshold: {
        if (similarityThresholdFunction.similarityThreshold) {
          return `"${escapeColumnName(
            similarityThresholdFunction.similarityThreshold,
            experimentCustomColumnPrefix
          )}"`;
        } else {
          throw new Error(
            `Similarity threshold function type ${similarityThresholdFunction.similarityThreshold} is missing required property similarityThreshold.`
          );
        }
      }
      case SimilarityThresholdFunctionValuesTypeEnum.Operator:
        if (similarityThresholdFunction.operator) {
          let operator: string;
          switch (similarityThresholdFunction.operator.operator) {
            case SimilarityThresholdOperatorOperatorEnum.Add:
              operator = '+';
              break;
            case SimilarityThresholdOperatorOperatorEnum.Divide:
              operator = '/';
              break;
            case SimilarityThresholdOperatorOperatorEnum.Multiply:
              operator = '*';
              break;
            case SimilarityThresholdOperatorOperatorEnum.Subtract:
              operator = '-';
              break;
            default:
              throw new Error(
                `Unknown similarity threshold operator ${similarityThresholdFunction.operator}.`
              );
          }
          return `(${this.convertSimilarityThresholdFunctionToExpression(
            similarityThresholdFunction.operator.left
          )}${operator}${this.convertSimilarityThresholdFunctionToExpression(
            similarityThresholdFunction.operator.right
          )})`;
        } else {
          throw new Error(
            `Similarity threshold function type ${similarityThresholdFunction.similarityThreshold} is missing required property operator.`
          );
        }
      default:
        throw new Error(
          `Unknown similarity threshold function type: ${similarityThresholdFunction.type}`
        );
    }
  }

  protected findClosingBracket(expression: string, openIndex: number): number {
    let bracketCount = 1;
    let closeIndex = openIndex;
    while (bracketCount > 0 && ++closeIndex < expression.length) {
      if (expression[closeIndex] === '(') {
        bracketCount++;
      } else if (expression[closeIndex] === ')') {
        bracketCount--;
      }
    }
    return closeIndex;
  }

  convertExpressionToSimilarityThresholdFunction(
    expression: string
  ): SimilarityThresholdFunctionValues {
    if (expression.startsWith('(')) {
      let operatorIndex: number;
      if (expression[1] === '"') {
        operatorIndex = expression.indexOf('"', 2) + 1;
      } else if (expression[1] === '(') {
        operatorIndex = this.findClosingBracket(expression, 2) + 1;
      } else {
        throw new Error(
          `Error while parsing expression ${expression}. Unknown left hand operator.`
        );
      }
      let operator: SimilarityThresholdOperatorOperatorEnum;
      switch (expression[operatorIndex]) {
        case '+':
          operator = SimilarityThresholdOperatorOperatorEnum.Add;
          break;
        case '-':
          operator = SimilarityThresholdOperatorOperatorEnum.Subtract;
          break;
        case '/':
          operator = SimilarityThresholdOperatorOperatorEnum.Divide;
          break;
        case '*':
          operator = SimilarityThresholdOperatorOperatorEnum.Multiply;
          break;
        default:
          throw new Error(
            `Unknown operator ${expression[operatorIndex]} in expression ${expression}.`
          );
      }
      return {
        type: SimilarityThresholdFunctionValuesTypeEnum.Operator,
        operator: {
          left: this.convertExpressionToSimilarityThresholdFunction(
            expression.substring(1, operatorIndex)
          ),
          operator,
          right: this.convertExpressionToSimilarityThresholdFunction(
            expression.substring(operatorIndex + 1, expression.length - 1)
          ),
        },
      };
    } else {
      return {
        type: SimilarityThresholdFunctionValuesTypeEnum.SimilarityThreshold,
        similarityThreshold: expression.substring(
          1 + experimentCustomColumnPrefix.length,
          expression.length - 1
        ),
      };
    }
  }

  apiFunctionToStoredFunction(
    apiFunction: SimilarityThresholdFunction,
    experimentId: ExperimentId
  ): StoredSimilarityThresholdFunction {
    return {
      experiment: experimentId,
      id: apiFunction.id,
      expression: this.convertSimilarityThresholdFunctionToExpression(
        (apiFunction as unknown) as SimilarityThresholdFunctionValues
      ),
    };
  }

  storedFunctionToApiFunction(
    storedFunction: StoredSimilarityThresholdFunction
  ): SimilarityThresholdFunction {
    return ({
      id: storedFunction.id,
      ...this.convertExpressionToSimilarityThresholdFunction(
        storedFunction.expression
      ),
    } as unknown) as SimilarityThresholdFunction;
  }
}

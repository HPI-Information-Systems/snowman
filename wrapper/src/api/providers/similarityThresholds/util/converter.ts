import { tables } from '../../../database';
import { tableSchemas } from '../../../database/schemas';
import { ColumnValues } from '../../../database/tools/types';
import {
  ExperimentId,
  SimilarityThresholdFunction,
  SimilarityThresholdFunctionValues,
} from '../../../server/types';
import { expressionToFunction } from './expressionToFunction';
import { functionToExpression } from './functionToExpression';

type StoredSimilarityThresholdFunction = ColumnValues<
  typeof tableSchemas['meta']['similarityfunction']['columns']
>;

export class SimilarityThresholdFunctionConverter {
  apiFunctionToStoredFunction(
    apiFunction: SimilarityThresholdFunction,
    experimentId: ExperimentId
  ): StoredSimilarityThresholdFunction {
    return {
      experiment: experimentId,
      id: apiFunction.id,
      name: apiFunction.name,
      expression: functionToExpression(
        (apiFunction as unknown) as SimilarityThresholdFunctionValues,
        tables.experiment.experiment(experimentId).schema.columns
      ),
    };
  }

  storedFunctionToApiFunction(
    storedFunction: StoredSimilarityThresholdFunction
  ): SimilarityThresholdFunction {
    return ({
      id: storedFunction.id,
      ...expressionToFunction({
        expression: storedFunction.expression,
        name: storedFunction.name,
      }),
    } as unknown) as SimilarityThresholdFunction;
  }
}

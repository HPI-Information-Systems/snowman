import { tables } from '../../../database';
import { tableSchemas } from '../../../database/schemas';
import { ColumnValues } from '../../../database/tools/types';
import { SimilarityThresholdFunction } from '../../../server/types';
import { expressionToFunction } from './expressionToFunction';
import { functionToExpression } from './functionToExpression';

type StoredSimilarityThresholdFunction = ColumnValues<
  typeof tableSchemas['meta']['similarityfunction']['columns']
>;

export class SimilarityThresholdFunctionConverter {
  apiFunctionToStoredFunction(
    apiFunction: SimilarityThresholdFunction
  ): StoredSimilarityThresholdFunction {
    return {
      experiment: apiFunction.experimentId,
      id: apiFunction.id,
      name: apiFunction.name,
      expression: functionToExpression(
        apiFunction.definition,
        tables.experiment.experiment(apiFunction.experimentId).schema.columns
      ),
    };
  }

  storedFunctionToApiFunction(
    storedFunction: StoredSimilarityThresholdFunction
  ): SimilarityThresholdFunction {
    return ({
      id: storedFunction.id,
      name: storedFunction.name,
      experimentId: storedFunction.experiment,
      definition: expressionToFunction(storedFunction.expression),
    } as unknown) as SimilarityThresholdFunction;
  }
}

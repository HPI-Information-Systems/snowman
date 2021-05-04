import { tables } from '../../../database';
import { tableSchemas } from '../../../database/schemas';
import { ColumnValues } from '../../../database/tools/types';
import {
  ExperimentId,
  SimilarityThresholdFunction,
  SimilarityThresholdFunctionDefinition,
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
        (apiFunction as unknown) as SimilarityThresholdFunctionDefinition,
        tables.experiment.experiment(experimentId).schema.columns
      ),
    };
  }

  storedFunctionToApiFunction(
    storedFunction: StoredSimilarityThresholdFunction
  ): SimilarityThresholdFunction {
    return ({
      id: storedFunction.id,
      name: storedFunction.name,
      ...expressionToFunction(storedFunction.expression),
    } as unknown) as SimilarityThresholdFunction;
  }
}

import { tables } from '../../database';
import {
  AddSimilarityThresholdFunctionRequest,
  DeleteSimilarityThresholdFunctionRequest,
  GetSimilarityThresholdFunctionRequest,
  GetSimilarityThresholdFunctionsRequest,
  SetSimilarityThresholdFunctionRequest,
  SimilarityThresholdFunction,
  SimilarityThresholdFunctionId,
} from '../../server/types';
import { providers } from '..';
import { SimilarityThresholdFunctionConverter } from './util/converter';
import { functionToExpression } from './util/functionToExpression';

export class SimilarityThresholdsProvider {
  protected converter = new SimilarityThresholdFunctionConverter();

  addSimilarityThresholdFunction({
    experimentId,
    similarityThresholdFunction,
  }: AddSimilarityThresholdFunctionRequest): SimilarityThresholdFunctionId {
    providers.experiment.getExperiment(experimentId);
    return tables.meta.similarityfunction.upsert([
      {
        experiment: experimentId,
        expression: functionToExpression(
          similarityThresholdFunction,
          tables.experiment.experiment(experimentId).schema.columns
        ),
      },
    ])[0];
  }

  deleteSimilarityThresholdFunction({
    experimentId,
    functionId,
  }: DeleteSimilarityThresholdFunctionRequest): void {
    tables.meta.similarityfunction.delete({
      experiment: experimentId,
      id: functionId,
    });
  }

  getSimilarityThresholdFunction({
    experimentId,
    functionId,
  }: GetSimilarityThresholdFunctionRequest): SimilarityThresholdFunction {
    const func = tables.meta.similarityfunction.get({
      experiment: experimentId,
      id: functionId,
    });
    if (!func) {
      throw new Error(
        `A similarity threshold function with the id ${functionId} does not exist in the experiment ${experimentId}.`
      );
    }
    return this.converter.storedFunctionToApiFunction(func);
  }

  getSimilarityThresholdFunctions({
    experimentId,
  }: GetSimilarityThresholdFunctionsRequest): SimilarityThresholdFunction[] {
    return tables.meta.similarityfunction
      .all({
        experiment: experimentId,
      })
      .map((func) => this.converter.storedFunctionToApiFunction(func));
  }

  setSimilarityThresholdFunction({
    experimentId,
    functionId,
    similarityThresholdFunction,
  }: SetSimilarityThresholdFunctionRequest): void {
    providers.experiment.getExperiment(experimentId);
    tables.meta.similarityfunction.upsert([
      {
        experiment: experimentId,
        expression: functionToExpression(
          similarityThresholdFunction,
          tables.experiment.experiment(experimentId).schema.columns
        ),
        id: functionId,
      },
    ]);
  }
}

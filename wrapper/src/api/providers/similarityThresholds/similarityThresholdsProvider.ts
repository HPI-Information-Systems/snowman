import { databaseBackend, tables } from '../../database';
import {
  AddSimilarityThresholdFunctionRequest,
  DeleteSimilarityThresholdFunctionRequest,
  ExperimentId,
  GetSimilarityThresholdFunctionRequest,
  GetSimilarityThresholdFunctionsRequest,
  SetSimilarityThresholdFunctionRequest,
  SimilarityThresholdFunction,
  SimilarityThresholdFunctionId,
} from '../../server/types';
import { providers } from '..';
import { invalidateCaches } from '../benchmark/intersection/cache';
import { SimilarityThresholdFunctionConverter } from './util/converter';
import { functionToExpression } from './util/functionToExpression';

export class SimilarityThresholdsProvider {
  protected converter = new SimilarityThresholdFunctionConverter();

  protected writeSimilarities(
    experimentId: ExperimentId,
    functionId: SimilarityThresholdFunctionId,
    expression: string
  ): void {
    const experimentTable = tables.experiment.experiment(experimentId);
    const similarityTable = tables.experiment.similarityThresholdFunction(
      experimentId,
      functionId
    );
    similarityTable.dropTable(false);
    databaseBackend().exec(`
      CREATE TABLE ${similarityTable} AS
        SELECT "${experimentTable.schema.columns.id1.name}" as "${similarityTable.schema.columns.id1.name}",
               "${experimentTable.schema.columns.id2.name}" as "${similarityTable.schema.columns.id2.name}",
               ${expression} as "${similarityTable.schema.columns.similarity.name}"
          FROM ${experimentTable}
    `);
    similarityTable.createIndices(true);
  }

  addSimilarityThresholdFunction({
    experimentId,
    similarityThresholdFunction,
  }: AddSimilarityThresholdFunctionRequest): SimilarityThresholdFunctionId {
    return databaseBackend().transaction(() => {
      providers.experiment.getExperiment(experimentId);
      const expression = functionToExpression(
        similarityThresholdFunction,
        tables.experiment.experiment(experimentId).schema.columns
      );
      const [functionId] = tables.meta.similarityfunction.upsert([
        {
          experiment: experimentId,
          expression,
        },
      ]);
      this.writeSimilarities(experimentId, functionId, expression);
      return functionId;
    })();
  }

  setSimilarityThresholdFunction({
    experimentId,
    functionId,
    similarityThresholdFunction,
  }: SetSimilarityThresholdFunctionRequest): void {
    return databaseBackend().transaction(() => {
      providers.experiment.getExperiment(experimentId);
      const expression = functionToExpression(
        similarityThresholdFunction,
        tables.experiment.experiment(experimentId).schema.columns
      );
      tables.meta.similarityfunction.upsert([
        {
          experiment: experimentId,
          expression,
          id: functionId,
        },
      ]);
      this.writeSimilarities(experimentId, functionId, expression);
      invalidateCaches(functionId);
    })();
  }

  deleteSimilarityThresholdFunction({
    experimentId,
    functionId,
  }: DeleteSimilarityThresholdFunctionRequest): void {
    return databaseBackend().transaction(() => {
      tables.meta.similarityfunction.delete({
        experiment: experimentId,
        id: functionId,
      });
      tables.experiment
        .similarityThresholdFunction(experimentId, functionId)
        .dropTable();
      invalidateCaches(functionId);
    })();
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
}

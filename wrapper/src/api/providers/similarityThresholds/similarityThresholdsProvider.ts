import { databaseBackend, tables } from '../../database';
import { tableSchemas } from '../../database/schemas';
import { ColumnDataType } from '../../database/tools/types';
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
import { UnionFind } from '../benchmark/cluster/unionFind';
import { datasetFromExperimentIds } from '../benchmark/datasetFromExperiments';
import { invalidateCaches } from '../benchmark/intersection/cache';
import { SimilarityThresholdFunctionConverter } from './util/converter';
import { functionToExpression } from './util/functionToExpression';

type SimilaritySchema = ReturnType<
  typeof tableSchemas['experiment']['similarityThresholdFunction']
>;

export class SimilarityThresholdsProvider {
  protected converter = new SimilarityThresholdFunctionConverter();

  protected writeSimilarities(
    experimentId: ExperimentId,
    functionId: SimilarityThresholdFunctionId,
    expression: string
  ): void {
    return databaseBackend().transaction(() => {
      const { numberOfRecords } = datasetFromExperimentIds([experimentId]);
      const experimentTable = tables.experiment.experiment(experimentId);
      const similarityTable = tables.experiment.similarityThresholdFunction(
        experimentId,
        functionId
      );
      similarityTable.dropTable(false);
      similarityTable.create(true, false);
      const similarities: {
        [similarityTable.schema.columns.id1.name]: ColumnDataType<
          SimilaritySchema['columns']['id1']
        >;
        [similarityTable.schema.columns.id2.name]: ColumnDataType<
          SimilaritySchema['columns']['id2']
        >;
        [similarityTable.schema.columns.similarity.name]: ColumnDataType<
          SimilaritySchema['columns']['similarity']
        >;
      }[] = databaseBackend()
        .prepare(
          `
        SELECT "${experimentTable.schema.columns.id1.name}" AS "${similarityTable.schema.columns.id1.name}",
               "${experimentTable.schema.columns.id2.name}" AS "${similarityTable.schema.columns.id2.name}",
               ${expression} AS "${similarityTable.schema.columns.similarity.name}"
          FROM ${experimentTable}
      ORDER BY "${similarityTable.schema.columns.similarity.name}" DESC
        `
        )
        .all();
      const unionFind = new UnionFind(numberOfRecords);
      for (const { id1, id2, similarity } of similarities) {
        if (!unionFind.nodesAreLinked(id1, id2)) {
          unionFind.link([[id1, id2]]);
          similarityTable.upsert([
            {
              id1,
              id2,
              similarity,
            },
          ]);
        }
      }
      similarityTable.createIndices();
    })();
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

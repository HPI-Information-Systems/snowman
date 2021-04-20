import { Readable } from 'stream';

import { databaseBackend, tables } from '../../database';
import { ExperimentValues, FileResponse } from '../../server/types';
import { Experiment, ExperimentId } from '../../server/types';
import {
  GetExperimentFileRequest,
  SetExperimentFileFormatEnum,
} from '../../server/types/ExperimentRequests';
import { getSimilarity } from '../../tools/getSimilarity';
import { providers } from '..';
import { BenchmarkCache } from '../benchmark/cache';
import { DatasetIDMapper } from '../dataset/util/idMapper';
import { getExperimentInserter } from './file';
import { rawGetter } from './file/rawGetter';
import { similarityGetter } from './file/similarityGetter';
import { ExperimentConsistencyChecks } from './util/checks';
import { ExperimentConverter } from './util/converter';

export class ExperimentProvider {
  private readonly checks = new ExperimentConsistencyChecks();
  private readonly converter = new ExperimentConverter();

  listExperiments(): Experiment[] {
    return tables.meta.experiment
      .all()
      .map((storedExperiment) =>
        this.converter.storedExperimentToApiExperiment(storedExperiment)
      );
  }

  addExperiment(experiment: ExperimentValues): ExperimentId {
    this.checks.throwIfAlgorithmNotExists(experiment.algorithmId);
    this.checks.throwIfDatasetNotExists(experiment.datasetId);
    return tables.meta.experiment.upsert([
      {
        name: experiment.name,
        description: experiment.description,
        algorithm: experiment.algorithmId,
        dataset: experiment.datasetId,
      },
    ])[0];
  }

  getExperiment(id: ExperimentId): Experiment {
    const experiment = tables.meta.experiment.get({ id });
    if (!experiment) {
      throw new Error(`An experiment with the id ${id} does not exist.`);
    }
    return this.converter.storedExperimentToApiExperiment(experiment);
  }

  setExperiment(id: ExperimentId, experiment: ExperimentValues): void {
    const priorStoredExperiment = tables.meta.experiment.get({ id });
    const newStoredExperiment = this.converter.apiExperimentToStoredExperiment({
      ...experiment,
      id,
    });
    if (
      priorStoredExperiment &&
      newStoredExperiment.dataset !== priorStoredExperiment.dataset
    ) {
      throw new Error('The dataset of an experiment cannot be changed.');
    } else {
      this.checks.throwIfDatasetNotExists(newStoredExperiment.dataset);
    }
    this.checks.throwIfAlgorithmNotExists(newStoredExperiment.algorithm);
    newStoredExperiment.numberOfUploadedRecords =
      priorStoredExperiment?.numberOfUploadedRecords ?? null;
    tables.meta.experiment.upsert([newStoredExperiment]);
  }

  deleteExperiment(id: ExperimentId): void {
    this.checks.throwIfLocked(id);
    databaseBackend().transaction(() => {
      this.deleteExperimentFileNoChecks(id);
      this.deleteSimilarityThresholdFunctions(id);
      tables.meta.experiment.delete({ id });
    })();
  }

  getExperimentFile({
    experimentId,
    startAt,
    limit,
    sortBy,
    similarityThreshold,
    similarityThresholdFunction,
  }: GetExperimentFileRequest): FileResponse {
    const similarity = getSimilarity(
      similarityThreshold,
      similarityThresholdFunction
    );
    if (similarity) {
      return similarityGetter(experimentId, similarity).get(
        startAt,
        limit,
        sortBy
      );
    } else {
      return rawGetter(experimentId).get(startAt, limit, sortBy);
    }
  }

  async setExperimentFile(
    id: ExperimentId,
    format: SetExperimentFileFormatEnum,
    file: Readable
  ): Promise<void> {
    this.checks.throwIfExperimentFileAlreadyExists(id);
    this.checks.throwIfLocked(id);
    return this.checks.sync.call(async () => {
      const { datasetId } = this.getExperiment(id);
      const dataset = providers.dataset.getDataset(datasetId);
      this.checks.throwIfDatasetHasNoRecordCount(dataset);

      const datasetIDMapper = new DatasetIDMapper(datasetId);
      const ExperimentInserter = getExperimentInserter(format);
      const numberOfUploadedRecords = await new ExperimentInserter(
        id,
        datasetIDMapper,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        dataset.numberOfRecords!,
        dataset.id
      )
        .insert(file)
        .catch((e) => {
          this.deleteExperimentFileNoChecks(id);
          throw e;
        });

      const storedExperiment = tables.meta.experiment.get({ id });
      if (storedExperiment) {
        storedExperiment.numberOfUploadedRecords = numberOfUploadedRecords;
        tables.meta.experiment.upsert([storedExperiment]);
      }
      BenchmarkCache.invalidateExperiment(id);
    }, id);
  }

  private deleteExperimentFileNoChecks(id: ExperimentId): void {
    tables.experiment.experiment(id).dropTable(false);
    const storedExperiment = tables.meta.experiment.get({ id });
    if (storedExperiment) {
      storedExperiment.numberOfUploadedRecords = null;
      tables.meta.experiment.upsert([storedExperiment]);
    }
    BenchmarkCache.invalidateExperiment(id);
  }

  private deleteSimilarityThresholdFunctions(experimentId: ExperimentId): void {
    for (const {
      id: functionId,
    } of providers.similarityThresholds.getSimilarityThresholdFunctions({
      experimentId,
    })) {
      providers.similarityThresholds.deleteSimilarityThresholdFunction({
        experimentId,
        functionId,
      });
    }
  }
}

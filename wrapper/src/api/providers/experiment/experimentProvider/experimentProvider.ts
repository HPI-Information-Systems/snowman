import { Readable } from 'stream';

import { databaseBackend, tables } from '../../../database';
import { ExperimentValues, FileResponse } from '../../../server/types';
import {
  Experiment,
  ExperimentFileFormat,
  ExperimentId,
} from '../../../server/types';
import { getProviders } from '../..';
import { invalidateCaches } from '../../benchmark/benchmarkProvider/intersection/cache';
import { DatasetIDMapper } from '../../dataset/datasetProvider/util/idMapper';
import { ExperimentFileGetter } from '../../experiment/experimentProvider/file/getter';
import { getExperimentInserter } from './file';
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
        timeToConfigure: experiment.softKPIs?.timeToConfigure,
        implementationKnowHowLevel:
          experiment.softKPIs?.implementationKnowHowLevel,
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
      tables.meta.experiment.delete({ id });
    })();
  }

  getExperimentFile(
    id: ExperimentId,
    startAt?: number,
    limit?: number,
    sortBy?: string
  ): FileResponse {
    return new ExperimentFileGetter(
      id,
      getProviders().experiment.getExperiment(id).datasetId
    ).get(startAt, limit, sortBy);
  }

  async setExperimentFile(
    id: ExperimentId,
    format: ExperimentFileFormat,
    file: Readable
  ): Promise<void> {
    this.checks.throwIfLocked(id);
    return this.checks.sync.call(async () => {
      this.deleteExperimentFileNoChecks(id);
      const { datasetId } = this.getExperiment(id);
      const dataset = getProviders().dataset.getDataset(datasetId);

      const datasetIDMapper = new DatasetIDMapper(datasetId);
      const ExperimentInserter = getExperimentInserter(format);
      const numberOfUploadedRecords = await new ExperimentInserter(
        id,
        datasetIDMapper,
        dataset.numberOfRecords
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
      invalidateCaches(id);
    }, id);
  }

  deleteExperimentFile(id: ExperimentId): void {
    this.checks.throwIfLocked(id);
    this.deleteExperimentFileNoChecks(id);
  }

  private deleteExperimentFileNoChecks(id: ExperimentId): void {
    tables.experiment.experiment(id).dropTable(false);
    const storedExperiment = tables.meta.experiment.get({ id });
    if (storedExperiment) {
      storedExperiment.numberOfUploadedRecords = null;
      tables.meta.experiment.upsert([storedExperiment]);
    }
    invalidateCaches(id);
  }
}

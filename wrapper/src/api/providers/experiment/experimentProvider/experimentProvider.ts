import { Readable } from 'stream';

import { databaseBackend, Table } from '../../../database';
import { latest } from '../../../database/schemas';
import { ExperimentValues } from '../../../server/types';
import {
  Experiment,
  ExperimentFileFormat,
  ExperimentId,
} from '../../../server/types';
import { getProviders } from '../..';
import { IntersectionCache } from '../../benchmark/benchmarkProvider/intersection/cache';
import { DatasetIDMapper } from '../../dataset/datasetProvider/util/idMapper';
import { ExperimentFileGetter } from '../../experiment/experimentProvider/file/getter';
import { BaseExperimentProvider } from '../baseExperimentProvider';
import { getExperimentInserter } from './file';
import { ExperimentProviderQueries } from './queries';
import { ExperimentConsistencyChecks } from './util/checks';
import { ExperimentConverter, StoredExperiment } from './util/converter';

export class ExperimentProvider extends BaseExperimentProvider {
  private readonly queries = new ExperimentProviderQueries();
  private readonly checks = new ExperimentConsistencyChecks();
  private readonly converter = new ExperimentConverter();

  listExperiments(): Experiment[] {
    return this.queries.listExperimentsQuery
      .all()
      .map((storedExperiment) =>
        this.converter.storedExperimentToApiExperiment(storedExperiment)
      );
  }

  addExperiment(experiment: ExperimentValues): ExperimentId {
    this.checks.throwIfAlgorithmNotExists(experiment.algorithmId);
    this.checks.throwIfDatasetNotExists(experiment.datasetId);
    const storedExperimentValues = this.converter.apiExperimentValuesToStoredExperimentValues(
      experiment
    );
    return this.queries.table.insert([
      {
        column: this.queries.schema.columns.name,
        value: storedExperimentValues.name,
      },
      {
        column: this.queries.schema.columns.description,
        value: storedExperimentValues.description,
      },
      {
        column: this.queries.schema.columns.algorithm,
        value: storedExperimentValues.algorithmId,
      },
      {
        column: this.queries.schema.columns.dataset,
        value: storedExperimentValues.datasetId,
      },
    ])[0];
  }

  getExperiment(id: ExperimentId): Experiment {
    const experiment = this.queries.getExperimentQuery.all(id);
    if (experiment.length === 0) {
      throw new Error(`An experiment with the id ${id} does not exist.`);
    }
    return this.converter.storedExperimentToApiExperiment(experiment[0]);
  }

  setExperiment(id: ExperimentId, experiment: ExperimentValues): void {
    const priorStoredExperiment = this.queries.getExperimentQuery.get(id) as
      | undefined
      | StoredExperiment;
    const storedExperimentValues = this.converter.apiExperimentValuesToStoredExperimentValues(
      experiment
    );
    if (
      priorStoredExperiment &&
      storedExperimentValues.datasetId !== priorStoredExperiment.datasetId
    ) {
      throw new Error('The dataset of an experiment cannot be changed.');
    } else {
      this.checks.throwIfDatasetNotExists(storedExperimentValues.datasetId);
    }
    this.checks.throwIfAlgorithmNotExists(storedExperimentValues.algorithmId);
    this.queries.setExperimentQuery.run({
      id,
      ...storedExperimentValues,
      numberOfUploadedRecords:
        priorStoredExperiment?.numberOfUploadedRecords ?? null,
    });
  }

  deleteExperiment(id: ExperimentId): void {
    this.checks.throwIfLocked(id);
    databaseBackend().transaction(() => {
      this.deleteExperimentFileNoChecks(id);
      this.queries.deleteExperimentQuery.run(id);
    })();
  }

  getExperimentFile(
    id: ExperimentId,
    startAt?: number,
    limit?: number,
    sortBy?: string
  ): IterableIterator<string[]> {
    this.checks.throwIfExperimentNotExists(id);
    return new ExperimentFileGetter(id).iterate(startAt, limit, sortBy);
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
      const { name, numberOfRecords } = getProviders().dataset.getDataset(
        datasetId
      );

      const datasetIDMapper = new DatasetIDMapper(datasetId);
      const ExperimentInserter = getExperimentInserter(format);
      const numberOfUploadedRecords = await new ExperimentInserter(
        id,
        datasetIDMapper
      )
        .insert(file)
        .catch((e) => {
          this.deleteExperimentFileNoChecks(id);
          throw e;
        });

      const storedExperiment = this.queries.getExperimentQuery.get(id) as
        | StoredExperiment
        | undefined;
      if (storedExperiment) {
        storedExperiment.numberOfUploadedRecords = numberOfUploadedRecords;
        this.queries.setExperimentQuery.run(storedExperiment);
      }
      IntersectionCache.clear();

      const mappedIdCount = datasetIDMapper.numberMappedIds();
      if (numberOfRecords !== undefined && numberOfRecords < mappedIdCount) {
        this.queries.updateDatasetNumberRecords.run({
          id: datasetId,
          numberOfRecords: mappedIdCount,
        });
        throw new Error(
          `The experiment contained previously unknown ids. In total there are more ids now than the number of records in the connected dataset (${name}). ` +
            `We increased the number of records in the connected dataset to the total amount of ids (${mappedIdCount}). Please make sure this was intentional.`
        );
      }
    }, id);
  }

  deleteExperimentFile(id: ExperimentId): void {
    this.checks.throwIfLocked(id);
    this.deleteExperimentFileNoChecks(id);
  }

  private deleteExperimentFileNoChecks(id: ExperimentId): void {
    new Table(latest.tableSchemas.experiment.experiment(id)).delete(false);
    const storedExperiment = this.queries.getExperimentQuery.get(id) as
      | StoredExperiment
      | undefined;
    if (storedExperiment) {
      storedExperiment.numberOfUploadedRecords = null;
      this.queries.setExperimentQuery.run(storedExperiment);
    }
    IntersectionCache.clear();
  }
}

import { Readable } from 'stream';

import { Dataset, DatasetId, DatasetValues } from '../../../server/types';
import {
  IntersectionCache,
  invalidateCaches,
} from '../../benchmark/benchmarkProvider/intersection/cache';
import { BaseDatasetProvider } from '../baseDatasetProvider';
import { DatasetDeleter } from './deleter';
import { DatasetFileGetter } from './file/getter';
import { DatasetInserter } from './file/inserter';
import { DatasetProviderQueries } from './queries';
import { DatasetConsistencyChecks } from './util/checks';
import { DatasetConverter, StoredDataset } from './util/converter';
import { DatasetIDMapper } from './util/idMapper';

export class DatasetProvider extends BaseDatasetProvider {
  protected readonly queries = new DatasetProviderQueries();
  protected readonly converter = new DatasetConverter();
  protected readonly checks = new DatasetConsistencyChecks();

  listDatasets(): Dataset[] {
    return this.queries.listDatasetsQuery
      .all()
      .map((dataset) => this.converter.storedDatasetToAPIDataset(dataset));
  }

  addDataset(dataset: DatasetValues): DatasetId {
    const storedDataset = this.converter.apiDatasetToStoredDataset(dataset);
    return this.queries.table.insert([
      {
        column: this.queries.schema.columns.name,
        value: storedDataset.name,
      },
      {
        column: this.queries.schema.columns.description,
        value: storedDataset.description,
      },
      {
        column: this.queries.schema.columns.tags,
        value: storedDataset.tags,
      },
      {
        column: this.queries.schema.columns.numberOfRecords,
        value: storedDataset.numberOfRecords,
      },
    ])[0];
  }

  getDataset(id: DatasetId): Dataset {
    const storedDataset = this.queries.getDatasetQuery.all(id);
    if (storedDataset.length === 0) {
      throw new Error(`A dataset with the id ${id} does not exist.`);
    }
    return this.converter.storedDatasetToAPIDataset(storedDataset[0]);
  }

  setDataset(id: DatasetId, dataset: DatasetValues): void {
    this.checks.throwIfLocked(id);
    const priorStoredDataset = this.queries.getDatasetQuery.get(id) as
      | StoredDataset
      | undefined;
    const newStoredDataset = this.converter.apiDatasetToStoredDataset({
      id,
      ...dataset,
      numberOfUploadedRecords:
        priorStoredDataset?.numberOfUploadedRecords ?? undefined,
    });
    newStoredDataset.numberOfRecords ??=
      priorStoredDataset?.numberOfRecords ?? null;
    this.checks.throwIfNumberOfRecordsInvalid(
      id,
      priorStoredDataset?.numberOfRecords ?? null,
      newStoredDataset.numberOfRecords
    );
    this.queries.setDatasetQuery.run(newStoredDataset);
    this.invalidateConnectedCaches(id);
  }

  deleteDataset(id: DatasetId): void {
    this.checks.throwIfLocked(id);
    new DatasetDeleter(id, this.queries).delete();
  }

  getDatasetFile(
    id: DatasetId,
    startAt?: number,
    limit?: number,
    sortBy?: string
  ): IterableIterator<string[]> {
    this.checks.throwIfNoDatasetFileUploaded(id);
    return new DatasetFileGetter(id, startAt, limit, sortBy).iterate();
  }

  async setDatasetFile(
    id: DatasetId,
    file: Readable,
    idColumn: string,
    quote: string,
    escape: string,
    separator: string
  ): Promise<void> {
    this.checks.throwIfLocked(id);
    return this.checks.sync.call(async () => {
      const storedDataset = this.converter.apiDatasetToStoredDataset(
        this.getDataset(id)
      );
      this.deleteDatasetFileNoChecks(id);

      const datasetIDMapper = new DatasetIDMapper(id);
      const { insertedRowCount, skippedRowCount } = await new DatasetInserter(
        id,
        datasetIDMapper,
        idColumn
      ).insert(file, quote, escape, separator);

      storedDataset.numberOfRecords = datasetIDMapper.numberMappedIds();
      storedDataset.numberOfUploadedRecords = insertedRowCount;
      this.queries.setDatasetQuery.run(storedDataset);
      this.invalidateConnectedCaches(id);
      if (
        storedDataset.numberOfRecords !== null &&
        insertedRowCount < storedDataset.numberOfRecords
      ) {
        throw new Error(
          `The uploaded dataset does not contain rows for all ids belonging to this dataset (we remember all ids which have been uploaded before via a dataset file or an experiment file). ` +
            `The number of rows which have been inserted is ${insertedRowCount} but this dataset has ${storedDataset.numberOfRecords} different ids. ` +
            `Please make sure this was intentional.` +
            (skippedRowCount > 0
              ? ` WARNING: The uploaded file contains ${skippedRowCount} invalid rows which have been skipped.`
              : '')
        );
      } else if (skippedRowCount > 0) {
        throw new Error(
          `WARNING: The uploaded file contains ${skippedRowCount} invalid rows which have been skipped.`
        );
      }
    }, id);
  }

  deleteDatasetFile(id: DatasetId): void {
    this.checks.throwIfLocked(id);
    this.deleteDatasetFileNoChecks(id);
  }

  protected deleteDatasetFileNoChecks(id: DatasetId): void {
    new DatasetDeleter(id, this.queries).deleteFile();
    const dataset = this.queries.getDatasetQuery.get(id) as StoredDataset;
    if (dataset) {
      dataset.numberOfUploadedRecords = null;
      this.queries.setDatasetQuery.run(dataset);
    }
  }

  protected invalidateConnectedCaches(datasetId: DatasetId): void {
    for (const experimentId of this.queries.listExperimentsUsingThisDataset(
      datasetId
    )) {
      invalidateCaches(experimentId);
    }
  }
}

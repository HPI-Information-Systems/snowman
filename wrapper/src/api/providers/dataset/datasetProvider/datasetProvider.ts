import { Readable } from 'stream';

import { tables } from '../../../database';
import {
  Dataset,
  DatasetId,
  DatasetValues,
  FileResponse,
} from '../../../server/types';
import { invalidateCaches } from '../../benchmark/benchmarkProvider/intersection/cache';
import { DatasetDeleter } from './deleter';
import { DatasetFileGetter } from './file/getter';
import { DatasetInserter } from './file/inserter';
import { DatasetConsistencyChecks } from './util/checks';
import { DatasetConverter } from './util/converter';
import { DatasetIDMapper } from './util/idMapper';

export class DatasetProvider {
  protected readonly converter = new DatasetConverter();
  protected readonly checks = new DatasetConsistencyChecks();

  listDatasets(): Dataset[] {
    return tables.meta.dataset
      .all()
      .map((dataset) => this.converter.storedDatasetToAPIDataset(dataset));
  }

  addDataset(dataset: DatasetValues): DatasetId {
    return tables.meta.dataset.upsert([
      {
        name: dataset.name,
        description: dataset.description,
        tags: this.converter.tagsArrayToString(dataset.tags ?? []),
        numberOfRecords: dataset.numberOfRecords,
      },
    ])[0];
  }

  getDataset(id: DatasetId): Dataset {
    const storedDataset = tables.meta.dataset.get({ id });
    if (!storedDataset) {
      throw new Error(`A dataset with the id ${id} does not exist.`);
    }
    return this.converter.storedDatasetToAPIDataset(storedDataset);
  }

  setDataset(id: DatasetId, dataset: DatasetValues): void {
    this.checks.throwIfLocked(id);
    const priorStoredDataset = tables.meta.dataset.get({ id });
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
    tables.meta.dataset.upsert([newStoredDataset]);
    invalidateCaches(id);
  }

  deleteDataset(id: DatasetId): void {
    this.checks.throwIfLocked(id);
    new DatasetDeleter(id).delete();
  }

  getDatasetFile(
    id: DatasetId,
    startAt?: number,
    limit?: number,
    sortBy?: string
  ): FileResponse {
    this.checks.throwIfNoDatasetFileUploaded(id);
    return new DatasetFileGetter(id, startAt, limit, sortBy).get();
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
      const insertedRowCount = await new DatasetInserter(
        id,
        datasetIDMapper,
        idColumn
      ).insert(file, quote, escape, separator);

      storedDataset.numberOfRecords = datasetIDMapper.numberMappedIds();
      storedDataset.numberOfUploadedRecords = insertedRowCount;
      tables.meta.dataset.upsert([storedDataset]);
      invalidateCaches(id);
      if (
        storedDataset.numberOfRecords !== null &&
        insertedRowCount < storedDataset.numberOfRecords
      ) {
        throw new Error(
          `The uploaded dataset does not contain rows for all ids belonging to this dataset (we remember all ids which have been uploaded before via a dataset file or an experiment file). ` +
            `The number of rows which have been inserted is ${insertedRowCount} but this dataset has ${storedDataset.numberOfRecords} different ids. ` +
            `Please make sure this was intentional.`
        );
      }
    }, id);
  }

  deleteDatasetFile(id: DatasetId): void {
    this.checks.throwIfLocked(id);
    this.deleteDatasetFileNoChecks(id);
  }

  protected deleteDatasetFileNoChecks(id: DatasetId): void {
    new DatasetDeleter(id).deleteFile();
    const dataset = tables.meta.dataset.get({ id });
    if (dataset) {
      dataset.numberOfUploadedRecords = null;
      tables.meta.dataset.upsert([dataset]);
    }
  }
}

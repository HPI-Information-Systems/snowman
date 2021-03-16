import { tables } from '../../../../database';
import { DatasetId } from '../../../../server/types';
import { ExecuteSynchronized } from '../../../../tools/executeSynchronized';
import { DatasetIDMapper } from './idMapper';

export class DatasetConsistencyChecks {
  readonly sync = new ExecuteSynchronized();

  throwIfNumberOfRecordsInvalid(
    id: DatasetId,
    existingNumberOfRecords: null | number,
    newNumberOfRecords: null | number
  ): void {
    if (this.datasetFileUploaded(id)) {
      if (newNumberOfRecords !== existingNumberOfRecords) {
        throw new Error(
          'You cannot set the number of records manually as you have uploaded a dataset file.'
        );
      }
    } else {
      const mappedIdCount = new DatasetIDMapper(id).numberMappedIds();
      if (newNumberOfRecords !== null && newNumberOfRecords < mappedIdCount) {
        throw new Error(
          `The provided number of records (${newNumberOfRecords}) is too small as experiments and dataset files you have uploaded before contain ${mappedIdCount} different ids.`
        );
      }
    }
  }

  throwIfNoDatasetFileUploaded(datasetId: DatasetId): void {
    if (!this.datasetFileUploaded(datasetId)) {
      throw new Error(
        `The dataset with the id ${datasetId} has no uploaded records.`
      );
    }
  }

  datasetFileUploaded(datasetId: DatasetId): boolean {
    return tables.dataset.dataset(datasetId).exists();
  }

  throwIfLocked(datasetId: DatasetId): void {
    if (this.sync.isLocked(datasetId)) {
      throw new Error(
        `Somebody else is currently editing the dataset ${datasetId}. Please try again later.`
      );
    }
  }
}

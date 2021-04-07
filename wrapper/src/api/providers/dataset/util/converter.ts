import { tableSchemas } from '../../../database/schemas';
import { ColumnValues } from '../../../database/tools/types';
import { Dataset } from '../../../server/types';

type StoredDataset = ColumnValues<
  typeof tableSchemas['meta']['dataset']['columns']
>;

export class DatasetConverter {
  tagsStringToArray(tags: string): string[] {
    tags = tags.trim();
    if (tags.length > 0) {
      return tags.split('/').map(decodeURIComponent);
    } else {
      return [];
    }
  }

  tagsArrayToString(tags?: string[]): string {
    return (tags ?? []).map(encodeURIComponent).join('/');
  }

  storedDatasetToAPIDataset(storedDataset: StoredDataset): Dataset {
    return {
      name: storedDataset.name,
      description: storedDataset.description ?? undefined,
      id: storedDataset.id,
      numberOfRecords: storedDataset.numberOfRecords ?? undefined,
      tags: this.tagsStringToArray(storedDataset.tags ?? ''),
      numberOfUploadedRecords:
        storedDataset.numberOfUploadedRecords ?? undefined,
    };
  }

  apiDatasetToStoredDataset(apiDataset: Dataset): StoredDataset {
    return {
      name: apiDataset.name,
      description: apiDataset.description ?? null,
      numberOfRecords: apiDataset.numberOfRecords ?? null,
      tags: this.tagsArrayToString(apiDataset.tags),
      id: (apiDataset as Dataset).id,
      numberOfUploadedRecords:
        (apiDataset as Dataset).numberOfUploadedRecords ?? null,
    };
  }
}

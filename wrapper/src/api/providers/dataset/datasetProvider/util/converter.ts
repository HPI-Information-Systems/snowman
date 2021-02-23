import { Dataset, DatasetValues } from '../../../../server/types';

export declare interface StoredDatasetValues {
  name: string;
  description: string | null;
  numberOfRecords: number | null;
  tags: string;
}

export declare interface StoredDataset extends StoredDatasetValues {
  id: number;
  numberOfUploadedRecords: number | null;
}

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
      tags: this.tagsStringToArray(storedDataset.tags),
      numberOfUploadedRecords:
        storedDataset.numberOfUploadedRecords ?? undefined,
    };
  }

  apiDatasetToStoredDataset<DatasetType extends Dataset | DatasetValues>(
    apiDataset: DatasetType
  ): DatasetType extends Dataset ? StoredDataset : StoredDatasetValues {
    const mappedValues: StoredDatasetValues = {
      name: apiDataset.name,
      description: apiDataset.description ?? null,
      numberOfRecords: apiDataset.numberOfRecords ?? null,
      tags: this.tagsArrayToString(apiDataset.tags),
    };
    if ('id' in apiDataset) {
      return {
        ...mappedValues,
        id: (apiDataset as Dataset).id,
        numberOfUploadedRecords:
          (apiDataset as Dataset).numberOfUploadedRecords ?? null,
      } as DatasetType extends Dataset ? StoredDataset : StoredDatasetValues;
    } else {
      return mappedValues as DatasetType extends Dataset
        ? StoredDataset
        : StoredDatasetValues;
    }
  }
}

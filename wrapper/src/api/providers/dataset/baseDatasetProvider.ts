import { Readable } from 'stream';

import { Dataset, DatasetId, DatasetValues } from '../../server/types';

export abstract class BaseDatasetProvider {
  abstract listDatasets(): Dataset[];
  abstract addDataset(dataset: DatasetValues): DatasetId;
  abstract getDataset(id: DatasetId): Dataset;
  abstract setDataset(id: DatasetId, dataset: DatasetValues): void;
  abstract deleteDataset(id: DatasetId): void;
  abstract getDatasetFile(
    id: DatasetId,
    startAt?: number,
    limit?: number,
    sortBy?: string
  ): IterableIterator<string[]>;
  abstract setDatasetFile(
    id: DatasetId,
    file: Readable,
    idColumn: string,
    quote: string,
    escape: string,
    separator: string
  ): Promise<void>;
  abstract deleteDatasetFile(id: DatasetId): void;
}

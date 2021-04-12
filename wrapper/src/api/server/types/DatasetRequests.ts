import { DatasetValues } from './DatasetValues';

export interface AddDatasetRequest {
  dataset: DatasetValues;
}

export interface DeleteDatasetRequest {
  datasetId: number;
}

export interface DeleteDatasetFileRequest {
  datasetId: number;
}

export interface GetDatasetRequest {
  datasetId: number;
}

export interface GetDatasetFileRequest {
  datasetId: number;
  startAt?: number;
  limit?: number;
  sortBy?: string;
}

export interface SetDatasetRequest {
  datasetId: number;
  dataset: DatasetValues;
}

export interface SetDatasetFileRequest {
  datasetId: number;
  idColumn: string;
  quote: string;
  escape: string;
  separator: string;
  file: Blob;
}

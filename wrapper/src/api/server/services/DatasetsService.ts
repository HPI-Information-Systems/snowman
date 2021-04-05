import { providers } from '../../providers';
import {
  AddDatasetRequest,
  Dataset,
  DatasetId,
  DatasetValues,
  DeleteDatasetFileRequest,
  DeleteDatasetRequest,
  FileResponse,
  GetDatasetFileRequest,
  GetDatasetRequest,
  Request,
  SetDatasetFileRequest,
  SetDatasetRequest,
} from '../types';
import { Service, SuccessResponse } from './Service';

function provider() {
  return providers.dataset;
}

export async function addDataset({
  dataset,
}: AddDatasetRequest): Promise<SuccessResponse<DatasetId>> {
  return Service.response(() => provider().addDataset(dataset), 201, 400);
}

export async function deleteDataset({
  datasetId,
}: DeleteDatasetRequest): Promise<SuccessResponse<void>> {
  return Service.response(() => provider().deleteDataset(datasetId), 204, 500);
}

export async function deleteDatasetFile({
  datasetId,
}: DeleteDatasetFileRequest): Promise<SuccessResponse<void>> {
  return Service.response(
    () => provider().deleteDatasetFile(datasetId),
    204,
    500
  );
}

export async function getDataset({
  datasetId,
}: GetDatasetRequest): Promise<SuccessResponse<Dataset>> {
  return Service.response(() => provider().getDataset(datasetId), 200, 404);
}

export async function getDatasetFile({
  datasetId,
  startAt,
  limit,
  sortBy,
}: GetDatasetFileRequest): Promise<SuccessResponse<FileResponse>> {
  return Service.response(
    () => provider().getDatasetFile(datasetId, startAt, limit, sortBy),
    200,
    404
  );
}

export async function getDatasets(): Promise<SuccessResponse<Dataset[]>> {
  return Service.response(() => provider().listDatasets(), 200, 500);
}

export async function setDataset({
  datasetId,
  dataset,
}: SetDatasetRequest): Promise<SuccessResponse<void>> {
  return Service.response(
    () => provider().setDataset(datasetId, dataset),
    204,
    400
  );
}

export async function setDatasetFile(
  { datasetId, idColumn, quote, escape, separator }: SetDatasetFileRequest,
  request: Request
): Promise<SuccessResponse<void>> {
  return Service.response(
    () =>
      provider().setDatasetFile(
        datasetId,
        request,
        idColumn,
        quote,
        escape,
        separator
      ),
    204,
    400
  );
}

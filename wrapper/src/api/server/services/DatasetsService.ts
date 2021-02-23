import { getProviders } from '../../providers';
import { Dataset, DatasetId, DatasetValues, Request } from '../types';
import { Service, SuccessResponse } from './Service';

function provider() {
  return getProviders().dataset;
}

/**
 * Creates a new dataset with metainformation
 *
 * datasetValues DatasetValues Metainformation of a dataset
 * returns Integer
 * */
export async function addDataset({
  body,
}: {
  body: DatasetValues;
}): Promise<SuccessResponse<DatasetId>> {
  return Service.response(() => provider().addDataset(body), 201, 400);
}

/**
 * Deletes a whole dataset by id
 *
 * datasetId Integer The id of a dataset
 * no response value expected for this operation
 * */
export async function deleteDataset({
  datasetId,
}: {
  datasetId: DatasetId;
}): Promise<SuccessResponse<void>> {
  return Service.response(() => provider().deleteDataset(datasetId), 204, 500);
}

/**
 * Deletes a dataset file (but not the dataset)
 *
 * datasetId Integer The id of a dataset file
 * no response value expected for this operation
 * */
export async function deleteDatasetFile({
  datasetId,
}: {
  datasetId: DatasetId;
}): Promise<SuccessResponse<void>> {
  return Service.response(
    () => provider().deleteDatasetFile(datasetId),
    204,
    500
  );
}

/**
 * Gets dataset by id
 *
 * datasetId Integer The id of a dataset
 * returns Dataset
 * */
export async function getDataset({
  datasetId,
}: {
  datasetId: DatasetId;
}): Promise<SuccessResponse<Dataset>> {
  return Service.response(() => provider().getDataset(datasetId), 200, 404);
}

/**
 * Gets a dataset file by id
 * Always returns one row with column names followed by the requested amount of rows. To only return the column names, pass startAt=0 and limit=0.
 *
 * datasetId Integer The id of a dataset file
 * startAt Integer  (optional)
 * limit Integer  (optional)
 * sortBy String  (optional)
 * returns File
 * */
export async function getDatasetFile({
  datasetId,
  startAt,
  limit,
  sortBy,
}: {
  datasetId: DatasetId;
  startAt: number;
  limit: number;
  sortBy: string;
}): Promise<SuccessResponse<IterableIterator<string[]>>> {
  return Service.response(
    () => provider().getDatasetFile(datasetId, startAt, limit, sortBy),
    200,
    404
  );
}
/**
 * Returns all Datasets
 *
 * returns List
 * */
export async function getDatasets(): Promise<SuccessResponse<Dataset[]>> {
  return Service.response(() => provider().listDatasets(), 200, 500);
}

/**
 * Updates or creates a dataset
 *
 * datasetId Integer The id of a dataset
 * datasetValues DatasetValues updated Dataset object
 * no response value expected for this operation
 * */
export async function setDataset({
  datasetId,
  body,
}: {
  datasetId: DatasetId;
  body: DatasetValues;
}): Promise<SuccessResponse<void>> {
  return Service.response(
    () => provider().setDataset(datasetId, body),
    204,
    400
  );
}

/**
 * Updates or creates a dataset file
 *
 * datasetId Integer The id of a dataset file
 * idColumn String The name of the alphanumeric id column in the uploaded dataset.
 * quote String The quote symbol used in the dataset
 * escape String The escape symbol used in the dataset
 * separator String The separator symbol used in the dataset
 * body File updated DatasetFile-csv object
 * no response value expected for this operation
 * */
export async function setDatasetFile(
  {
    datasetId,
    idColumn,
    quote,
    escape,
    separator,
  }: {
    datasetId: number;
    idColumn: string;
    quote: string;
    escape: string;
    separator: string;
  },
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

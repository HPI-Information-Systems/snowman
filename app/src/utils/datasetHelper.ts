import { Dataset } from 'api';

export const couldPreviewDataset = (aDataset: Dataset): boolean =>
  aDataset.numberOfUploadedRecords !== undefined;

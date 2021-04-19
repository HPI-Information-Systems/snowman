import { Dataset } from 'api';
import { intersection } from 'lodash';

export const doesDatasetMatchTags = (
  aDataset: Dataset | null,
  selectedTags: string[]
): boolean =>
  intersection(selectedTags, aDataset?.tags ?? []).length > 0 ||
  selectedTags.length === 0;

export const couldPreviewDataset = (aDataset: Dataset): boolean =>
  aDataset.numberOfUploadedRecords !== undefined;

export const getDatasetNameFromId = (
  anId: number,
  datasets: Dataset[]
): string =>
  datasets.find((aDataset: Dataset): boolean => aDataset.id === anId)?.name ??
  'Unknown';

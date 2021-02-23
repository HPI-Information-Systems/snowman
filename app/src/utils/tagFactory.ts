import { Dataset } from 'api';
import { flattenDeep, union, uniq } from 'lodash';

export const getPredefinedDatasetTags = (): string[] => [];

const getTagsFromListsOfTags = (
  listsOfTags: string[][],
  predefinedTags: string[]
): string[] => union(uniq(flattenDeep(listsOfTags)), predefinedTags);

export const getTagsFromDatasets = (datasets: Dataset[]): string[] =>
  getTagsFromListsOfTags(
    datasets.map((aDataset: Dataset): string[] => aDataset?.tags ?? []),
    getPredefinedDatasetTags()
  );

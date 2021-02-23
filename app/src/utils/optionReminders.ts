import { Dataset } from 'api';

export interface ISelectedOptionsMap {
  dataset: Dataset | null;
  experiments: string[];
}

export const emptySelectedOptions = (): string[] => [];
export const selectedDataset = (
  selectedOptions: ISelectedOptionsMap
): string[] =>
  selectedOptions.dataset === null ? [] : [selectedOptions.dataset.name];
export const selectedExperiments = (
  selectedOptions: ISelectedOptionsMap
): string[] =>
  selectedOptions.experiments.map(
    (value: string, index: number) => `${index + 1}. ${value}`
  );

export const selectedMetrics = (): string[] => ['Binary Comparison'];

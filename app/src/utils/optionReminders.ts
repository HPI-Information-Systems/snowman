import { Experiment } from 'api';
import { ImmediateStore } from 'store/models';

export const emptySelectedOptions = (): string[] => [];
export const selectedDataset = (aState: ImmediateStore): string[] =>
  aState.BenchmarkConfigurationStore.selectedDataset === null
    ? []
    : [aState.BenchmarkConfigurationStore.selectedDataset.name];
export const selectedExperiments = (aState: ImmediateStore): string[] =>
  aState.BenchmarkConfigurationStore.chosenExperiments.map(
    (anExperiment: Experiment) => anExperiment.name
  );

export const selectedBenchmarkConfiguration = (): string[] => [
  'to be designated',
];

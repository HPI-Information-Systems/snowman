import { ImmediateStore } from 'store/models';
import { getExperimentNameFromId } from 'utils/experimentsHelpers';

export const emptySelectedOptions = (): string[] => [];
export const selectedDataset = (aState: ImmediateStore): string[] =>
  aState.DatasetsStore.selectedDataset === null
    ? []
    : [aState.DatasetsStore.selectedDataset.name];
export const selectedExperiments = (aState: ImmediateStore): string[] =>
  aState.ExperimentsStore.selectedExperiments.map((expId: number) =>
    getExperimentNameFromId(expId, aState.ExperimentsStore.experiments)
  );

export const selectedMetrics = (): string[] => ['Binary Comparison'];

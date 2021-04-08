import { Experiment } from 'api';
import { sparklesOutline } from 'ionicons/icons';
import { ImmediateStore } from 'store/models';
import { SelectedOptionItem } from 'types/SelectedOptionItem';

export const emptySelectedOptions = (): SelectedOptionItem[] => [];
export const selectedDataset = (aState: ImmediateStore): SelectedOptionItem[] =>
  aState.BenchmarkConfigurationStore.selectedDataset === null
    ? []
    : [
        {
          id: aState.BenchmarkConfigurationStore.selectedDataset.id,
          displayName: aState.BenchmarkConfigurationStore.selectedDataset.name,
        },
      ];
export const selectedExperiments = (
  aState: ImmediateStore
): SelectedOptionItem[] => [
  ...aState.BenchmarkConfigurationStore.chosenGoldStandards.map(
    (anExperiment: Experiment): SelectedOptionItem => ({
      id: anExperiment.id,
      displayName: anExperiment.name,
      iconEnd: sparklesOutline,
    })
  ),
  ...aState.BenchmarkConfigurationStore.chosenExperiments.map(
    (anExperiment: Experiment): SelectedOptionItem => ({
      id: anExperiment.id,
      displayName: anExperiment.name,
    })
  ),
];

import { Experiment } from 'api';
import { ribbon } from 'ionicons/icons';
import { ImmediateStore } from 'store/models';
import { SelectedOptionItem } from 'types/SelectedOptionItem';

export const emptySelectedOptions = (): SelectedOptionItem[] => [];
export const selectedDataset = (aState: ImmediateStore): SelectedOptionItem[] =>
  aState.BenchmarkConfigurationStore.selectedDataset === null
    ? []
    : [
        {
          displayName: aState.BenchmarkConfigurationStore.selectedDataset.name,
          icon: null,
        },
      ];
export const selectedExperiments = (
  aState: ImmediateStore
): SelectedOptionItem[] => [
  ...aState.BenchmarkConfigurationStore.chosenGoldStandards.map(
    (anExperiment: Experiment): SelectedOptionItem => ({
      displayName: anExperiment.name,
      icon: ribbon,
    })
  ),
  ...aState.BenchmarkConfigurationStore.chosenExperiments.map(
    (anExperiment: Experiment): SelectedOptionItem => ({
      displayName: anExperiment.name,
      icon: null,
    })
  ),
];

import { ImmediateStore } from 'store/models';

export const couldAlwaysEnterPage = (): boolean => true;
export const couldNeverEnterPage = (): boolean => false;
export const couldEnterExperimentsSelector = (
  aState: ImmediateStore
): boolean => aState.BenchmarkConfigurationStore.selectedDataset !== null;
export const couldEnterBinaryMetricsPage = (aState: ImmediateStore): boolean =>
  aState.BenchmarkConfigurationStore.chosenExperiments.length === 1 &&
  aState.BenchmarkConfigurationStore.chosenGoldStandards.length === 1;

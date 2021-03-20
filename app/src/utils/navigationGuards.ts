import { ImmediateStore } from 'store/models';

export const couldAlwaysEnterPage = (): boolean => true;
export const couldNeverEnterPage = (): boolean => false;
export const couldEnterExperimentsSelector = (
  aState: ImmediateStore
): boolean => aState.BenchmarkConfigurationStore.selectedDataset !== null;

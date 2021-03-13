import { ImmediateStore } from 'store/models';

export const couldAlwaysEnterPage = (): boolean => true;
export const couldNeverEnterPage = (): boolean => false;
export const couldEnterExperimentsSelector = (
  aState: ImmediateStore
): boolean => aState.DatasetsStore.selectedDataset !== null;
export const couldEnterBenchmarkConfigurator = (
  aState: ImmediateStore
): boolean =>
  aState.ExperimentsStore.selectedExperiments.length > 1 &&
  couldEnterExperimentsSelector(aState);

import { ImmediateStore, Store } from 'store/models';

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
export const couldEnterBinaryMetricsPage = (aState: Store): boolean =>
  aState.BenchmarkConfigStore.selectedGoldstandards.length === 1 &&
  aState.BenchmarkConfigStore.selectedExperiments.length === 1;
export const couldEnterNMetricsPage = (aState: Store): boolean =>
  aState.BenchmarkConfigStore.selectedGoldstandards.length === 1 &&
  aState.BenchmarkConfigStore.selectedExperiments.length >= 1;

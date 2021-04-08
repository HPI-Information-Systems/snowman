import { ImmediateStore } from 'store/models';

export const couldAlwaysEnterPage = (): boolean => true;
export const couldNeverEnterPage = (): boolean => false;

export const couldEnterExperimentsSelector = (
  aState: ImmediateStore
): boolean => aState.BenchmarkConfigurationStore.selectedDataset !== null;

export const couldEnterDashboardPage = (aState: ImmediateStore): boolean =>
  couldEnterBinaryMetricsPage(aState) ||
  couldEnterIntersectionPage(aState) ||
  couldEnterNMetricsPage(aState);

export const couldEnterBinaryMetricsPage = (aState: ImmediateStore): boolean =>
  aState.BenchmarkConfigurationStore.chosenExperiments.length === 1 &&
  aState.BenchmarkConfigurationStore.chosenGoldStandards.length === 1;

export const couldEnterIntersectionPage = (aState: ImmediateStore): boolean =>
  aState.BenchmarkConfigurationStore.chosenExperiments.length +
    aState.BenchmarkConfigurationStore.chosenGoldStandards.length >=
    1 && aState.BenchmarkConfigurationStore.selectedDataset !== null;

export const couldEnterNMetricsPage = (aState: ImmediateStore): boolean =>
  aState.BenchmarkConfigurationStore.chosenExperiments.length > 0 &&
  aState.BenchmarkConfigurationStore.chosenGoldStandards.length === 1;

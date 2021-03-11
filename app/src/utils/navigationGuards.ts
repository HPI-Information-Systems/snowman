import { ImmediateStore } from 'store/models';

export const couldAlwaysEnterPage = (): boolean => true;
export const couldEnterExperimentsSelector = (
  aState: ImmediateStore
): boolean => aState.DatasetsStore.selectedDataset !== null;
export const couldEnterMetricsViewer = (aState: ImmediateStore): boolean =>
  aState.ExperimentsStore.selectedExperiments.length > 1 &&
  couldEnterExperimentsSelector(aState);

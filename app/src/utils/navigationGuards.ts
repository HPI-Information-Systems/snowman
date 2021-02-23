import { Store } from 'store/models';

export const couldAlwaysEnterPage = (): boolean => true;
export const couldEnterExperimentsSelector = (aState: Store): boolean =>
  aState.DatasetsStore.selectedDataset !== null;
export const couldEnterMetricsViewer = (aState: Store): boolean =>
  aState.ExperimentsStore.selectedExperiments.length > 1 &&
  couldEnterExperimentsSelector(aState);

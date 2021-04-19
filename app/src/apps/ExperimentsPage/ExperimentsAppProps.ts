import { Algorithm, Dataset, Experiment } from 'api';

export interface ExperimentsAppStateProps {
  selectedAlgorithms: Algorithm[];
  selectedDatasets: Dataset[];
  currentExperiments: Experiment[];
}

export interface ExperimentsAppOwnProps {
  algorithms: Algorithm[];
  datasets: Dataset[];
  experiments: Experiment[];
}

export interface ExperimentsAppDispatchProps {
  selectDataset(id: number): void;
  selectAlgorithm(id: number): void;
}

export type ExperimentsAppProps = ExperimentsAppOwnProps &
  ExperimentsAppDispatchProps &
  ExperimentsAppStateProps;

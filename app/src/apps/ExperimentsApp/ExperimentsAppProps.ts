import { Algorithm, Dataset, Experiment } from 'api';

export interface ExperimentsAppStateProps {
  selectedAlgorithms: number[];
  selectedDatasets: number[];
  currentExperiments: Experiment[];
}

export interface ExperimentsAppOwnProps {
  algorithms: Algorithm[];
  datasets: Dataset[];
  experiments: Experiment[];
}

export interface ExperimentsAppDispatchProps {
  addExperiment(): void;
  changeSelectedDatasets(selection: number[]): void;
  changeSelectedAlgorithms(selection: number[]): void;
}

export type ExperimentsAppProps = ExperimentsAppOwnProps &
  ExperimentsAppDispatchProps &
  ExperimentsAppStateProps;

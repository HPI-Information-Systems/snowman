import { Algorithm, Dataset, Experiment } from 'api';
import { IonSelectChangeEvent } from 'types/IonChangeEvent';

export interface ExperimentsAppStateProps {
  selectedAlgorithms: string[];
  selectedDatasets: string[];
  currentExperiments: Experiment[];
}

export interface ExperimentsAppOwnProps {
  algorithms: Algorithm[];
  datasets: Dataset[];
  experiments: Experiment[];
}

export interface ExperimentsAppDispatchProps {
  changeSelectedDatasets(event: IonSelectChangeEvent): void;
  changeSelectedAlgorithms(event: IonSelectChangeEvent): void;
}

export type ExperimentsAppProps = ExperimentsAppOwnProps &
  ExperimentsAppDispatchProps &
  ExperimentsAppStateProps;

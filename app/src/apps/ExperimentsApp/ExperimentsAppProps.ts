import { Experiment } from 'api';
import { CentralResourcesModel } from 'apps/SnowmanApp/types/CentralResourcesModel';

export interface ExperimentsAppOwnProps {
  resources: CentralResourcesModel;
}

export interface ExperimentsAppStateProps {
  selectedAlgorithms: number[];
  selectedDatasets: number[];
  currentExperiments: Experiment[];
}

export interface ExperimentsAppDispatchProps {
  addExperiment(): void;
  changeSelectedDatasets(selection: number[]): void;
  changeSelectedAlgorithms(selection: number[]): void;
}

export type ExperimentsAppProps = ExperimentsAppOwnProps &
  ExperimentsAppDispatchProps &
  ExperimentsAppStateProps;

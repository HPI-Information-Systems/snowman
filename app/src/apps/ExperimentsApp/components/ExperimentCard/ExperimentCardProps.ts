import { Experiment } from 'api';

export interface ExperimentCardStateProps {
  couldPreview: boolean;
}

export interface ExperimentCardOwnProps {
  experiment: Experiment;
  algorithmName: string;
  datasetName: string;
}

export interface ExperimentCardDispatchProps {
  deleteExperiment(): void;
  editExperiment(): void;
  previewExperiment(): void;
}

export type ExperimentCardProps = ExperimentCardOwnProps &
  ExperimentCardDispatchProps &
  ExperimentCardStateProps;

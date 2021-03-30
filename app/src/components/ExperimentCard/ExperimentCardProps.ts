import { Experiment } from 'api';

export interface ExperimentCardStateProps {
  algorithmName: string;
  couldPreview: boolean;
}

export interface ExperimentCardOwnProps {
  experiment: Experiment;
}

export interface ExperimentCardDispatchProps {
  deleteExperiment(): void;
  editExperiment(): void;
  previewExperiment(): void;
}

export type ExperimentCardProps = ExperimentCardOwnProps &
  ExperimentCardDispatchProps &
  ExperimentCardStateProps;

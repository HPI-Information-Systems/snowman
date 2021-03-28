import { Algorithm, Experiment } from 'api';
import { ExperimentBuckets } from 'types/ExperimentBuckets';

export interface ExperimentDroppableOwnProps {
  bucketId: ExperimentBuckets;
}

export interface ExperimentDroppableStateProps {
  bucketContent: Experiment[];
  matchingSolutions: Algorithm[];
  isDropDisabled: boolean;
}

export interface ExperimentDroppableDispatchProps {
  editExperiment(anExperiment: Experiment): void;
  deleteExperiment(anExperiment: Experiment): void;
}

export type ExperimentDroppableProps = ExperimentDroppableOwnProps &
  ExperimentDroppableDispatchProps &
  ExperimentDroppableStateProps;

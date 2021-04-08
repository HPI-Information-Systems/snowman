import { Experiment } from 'api';
import { ExperimentBuckets } from 'types/ExperimentBuckets';

export interface ExperimentDroppableOwnProps {
  bucketId: ExperimentBuckets;
}

export interface ExperimentDroppableStateProps {
  bucketContent: Experiment[];
  isDropDisabled: boolean;
}

export type ExperimentDroppableProps = ExperimentDroppableOwnProps &
  ExperimentDroppableStateProps;

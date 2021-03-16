import { Experiment } from 'api';
import { ExperimentBuckets } from 'types/ExperimentBuckets';

export interface ExperimentDroppableProps {
  bucketId: ExperimentBuckets;
  bucketContent: Experiment[];
}

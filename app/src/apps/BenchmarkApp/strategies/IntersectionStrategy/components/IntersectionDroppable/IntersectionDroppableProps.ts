import { ExperimentConfigItem } from 'api';
import { ExperimentEntity } from 'types/ExperimentEntity';
import { IntersectionBuckets } from 'types/IntersectionBuckets';

export interface IntersectionDroppableOwnProps {
  bucketId: IntersectionBuckets;
  bucketContent: ExperimentEntity[];
}

export interface IntersectionDroppableStateProps {
  pairCounts: [ExperimentConfigItem, number][];
}

export type IntersectionDroppableProps = IntersectionDroppableOwnProps &
  IntersectionDroppableStateProps;

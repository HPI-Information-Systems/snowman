import { Experiment } from 'api';
import { IntersectionBuckets } from 'types/IntersectionBuckets';

export interface IntersectionDroppableOwnProps {
  bucketId: IntersectionBuckets;
  bucketContent: Experiment[];
}

export interface IntersectionDroppableStateProps {
  pairCounts: Map<number, number>;
}

export type IntersectionDroppableProps = IntersectionDroppableOwnProps &
  IntersectionDroppableStateProps;

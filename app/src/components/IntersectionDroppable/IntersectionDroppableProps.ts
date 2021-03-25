import { Experiment } from 'api';
import { IntersectionBuckets } from 'types/IntersectionBuckets';

export interface IntersectionDroppableOwnProps {
  bucketId: IntersectionBuckets;
  bucketContent: Experiment[];
}

export type IntersectionDroppableProps = IntersectionDroppableOwnProps;

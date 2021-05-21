import { ExperimentEntity } from 'types/ExperimentEntity';
import { IntersectionBuckets } from 'types/IntersectionBuckets';

export interface IntersectionDroppableOwnProps {
  bucketId: IntersectionBuckets;
  bucketContent: ExperimentEntity[];
}

export type IntersectionDroppableProps = IntersectionDroppableOwnProps;

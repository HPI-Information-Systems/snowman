import { ExperimentBuckets } from 'types/ExperimentBuckets';

export interface DragNDropDescriptor {
  sourceIndex: number;
  targetIndex: number;
  sourceBucket: ExperimentBuckets;
  targetBucket: ExperimentBuckets;
}

import { DropResult } from 'react-beautiful-dnd';
import { DragNDropDescriptor } from 'types/DragNDropDescriptor';
import { ExperimentBuckets } from 'types/ExperimentBuckets';

export const getDndDescriptorFromDropResult = (
  aDropResult: DropResult
): DragNDropDescriptor => ({
  sourceBucket: aDropResult.source.droppableId as ExperimentBuckets,
  sourceIndex: aDropResult.source.index,
  targetBucket: (aDropResult.destination?.droppableId ??
    ExperimentBuckets.AVAILABLE_EXPERIMENTS) as ExperimentBuckets,
  targetIndex: aDropResult.destination?.index ?? 0,
});

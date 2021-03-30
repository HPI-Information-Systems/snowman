import { DropResult } from 'react-beautiful-dnd';
import { DragNDropDescriptor } from 'types/DragNDropDescriptor';

export const getDndDescriptorFromDropResult = <T extends string>(
  aDropResult: DropResult,
  fallbackBucket: T
): DragNDropDescriptor<T> => ({
  sourceBucket: aDropResult.source.droppableId as T,
  sourceIndex: aDropResult.source.index,
  targetBucket: (aDropResult.destination?.droppableId ?? fallbackBucket) as T,
  targetIndex: aDropResult.destination?.index ?? 0,
});

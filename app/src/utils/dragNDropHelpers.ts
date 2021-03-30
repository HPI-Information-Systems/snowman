import { DropResult } from 'react-beautiful-dnd';
import { DragNDropDescriptor } from 'types/DragNDropDescriptor';
import { ObjectWithId } from 'types/ObjectWithId';

export const getDndDescriptorFromDropResult = <T extends string>(
  aDropResult: DropResult,
  fallbackBucket: T
): DragNDropDescriptor<T> => ({
  sourceBucket: aDropResult.source.droppableId as T,
  sourceIndex: aDropResult.source.index,
  targetBucket: (aDropResult.destination?.droppableId ?? fallbackBucket) as T,
  targetIndex: aDropResult.destination?.index ?? 0,
});

export const insertElementAt = <T>(
  sourceList: T[],
  anElement: T,
  targetIndex: number
): T[] =>
  sourceList.length === 0
    ? [anElement]
    : [
        ...sourceList.slice(0, targetIndex),
        anElement,
        ...sourceList.slice(targetIndex),
      ];

export const filterOutAnElement = <T extends ObjectWithId>(
  aBucket: T[],
  anElement: T
): T[] =>
  aBucket.filter(
    (currentElement: T): boolean => currentElement.id !== anElement.id
  );

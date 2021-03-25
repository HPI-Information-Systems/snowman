export interface DragNDropDescriptor<T> {
  sourceIndex: number;
  targetIndex: number;
  sourceBucket: T;
  targetBucket: T;
}

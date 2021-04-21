import { NestedArray } from './types';

export function flattenDeep<T>(nestedArray: NestedArray<T>): T[] {
  return Array.isArray(nestedArray)
    ? nestedArray.reduce<T[]>(
        (target, next) => target.concat(flattenDeep(next)),
        []
      )
    : [nestedArray];
}

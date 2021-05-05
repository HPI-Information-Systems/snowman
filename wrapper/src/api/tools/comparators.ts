import { NestedArray } from 'snowman-library';

export function compareArrays(
  array1: NestedArray<number>,
  array2: NestedArray<number>
): number {
  if (Array.isArray(array1) && Array.isArray(array2)) {
    if (array1.length === array2.length) {
      for (let index = 0; index < array1.length; index++) {
        const comparison = compareArrays(array1[index], array2[index]);
        if (comparison !== 0) {
          return comparison;
        }
      }
      return 0;
    } else {
      return array1.length - array2.length;
    }
  } else if (Array.isArray(array1)) {
    return 1;
  } else if (Array.isArray(array2)) {
    return -1;
  } else {
    return array1 - array2;
  }
}

export function compareNumbers(n1: number, n2: number): number {
  return n1 - n2;
}

const tmpArray: undefined[] = [];

/**
 * !can only be used synchronously
 * !always returns the same array
 * !must set all values to undefined after usage
 */
export function getTmpArray<T>(minSize: number): (T | undefined)[] {
  while (tmpArray.length < minSize) {
    tmpArray.push(undefined);
  }
  return tmpArray;
}

export function newEmptyArray<T>(size: number): (T | undefined)[] {
  const array: (T | undefined)[] = [];
  for (let index = 0; index < size; index++) {
    array.push(undefined);
  }
  return array;
}

export function range(size: number): number[] {
  const array: number[] = [];
  for (let index = 0; index < size; index++) {
    array.push(index);
  }
  return array;
}

export function reduceLength<T>(array: T[], reduceBy: number): T[] {
  if (reduceBy < 100) {
    for (let index = 0; index < reduceBy; ++index) {
      array.pop();
    }
  } else {
    array.length -= reduceBy;
  }
  return array;
}

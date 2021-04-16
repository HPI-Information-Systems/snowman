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

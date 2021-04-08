/**
 * !Inplace
 */
export function shuffleArray<T>(array: Array<T>): Array<T> {
  for (let index = array.length - 1; index > 0; --index) {
    const swap = Math.floor((index + 1) * Math.random());
    [array[index], array[swap]] = [array[swap], array[index]];
  }
  return array;
}

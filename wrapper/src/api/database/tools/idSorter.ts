export function idSorter<T extends { id: number }>(a: T, b: T): number {
  return a.id - b.id;
}

import { Primitive } from '../types';
import { Cache } from './base';

export class PartiallySortedCache<
  KeyItemT extends Primitive,
  T,
  KeyT extends KeyItemT[][]
> extends Cache<KeyItemT, T, KeyT> {
  constructor(
    create: (...key: KeyT) => T,
    protected readonly sortedKeys: { sortBy: number; toSort: number[] }[]
  ) {
    super(create);
  }

  protected sortBy<ToSortT extends Primitive[][]>(
    key: KeyItemT[],
    toSort: ToSortT
  ): ToSortT {
    const indices = new Array(key.length)
      .fill(0)
      .map((_, index) => index)
      .sort((i1, i2) => (key[i1] < key[i2] ? -1 : key[i1] > key[i2] ? 1 : 0));
    return toSort.map((arr) => indices.map((index) => arr[index])) as ToSortT;
  }

  get(...key: KeyT): T {
    for (const { sortBy, toSort } of this.sortedKeys) {
      const sorted = this.sortBy(
        key[sortBy],
        toSort.map((index) => key[index])
      );
      sorted.forEach((arr, index) => (key[toSort[index]] = arr));
    }
    return this.getInternal(key);
  }
}

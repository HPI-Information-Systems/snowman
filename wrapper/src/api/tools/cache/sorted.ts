import { Primitive } from '../types';
import { Cache } from './base';

export class SortedCache<
  KeyItemT extends Primitive,
  T,
  KeyT extends KeyItemT[][]
> extends Cache<KeyItemT, T, KeyT> {
  get(...key: KeyT): T {
    key.forEach((subKey) => subKey.sort());
    return this.getInternal(key);
  }
}

import { LazyProperty } from './lazyProperty';
import { Primitive } from './types';

export class Cache<KeyItemT extends Primitive, T> {
  protected value?: T;
  protected readonly directSubcaches = new Map<KeyItemT, Cache<KeyItemT, T>>();
  protected readonly nestedSubcache: LazyProperty<Cache<KeyItemT, T>>;

  constructor(protected readonly create: (...key: KeyItemT[][]) => T) {
    this.nestedSubcache = new LazyProperty(
      () => new Cache<KeyItemT, T>(this.create)
    );
  }

  protected getOrAddDirectSubcache(key: KeyItemT): Cache<KeyItemT, T> {
    let subcache = this.directSubcaches.get(key);
    if (!subcache) {
      subcache = new Cache<KeyItemT, T>(this.create);
      this.directSubcaches.set(key, subcache);
    }
    return subcache;
  }

  protected getSorted(key: KeyItemT[][], xOffset = 0, yOffset = 0): T {
    if (xOffset === key.length) {
      if (!this.value) {
        this.value = this.create(...key);
      }
      return this.value;
    } else {
      const subKey = key[xOffset];
      if (yOffset === subKey.length) {
        return this.nestedSubcache.value.getSorted(key, xOffset + 1, 0);
      } else {
        return this.getOrAddDirectSubcache(subKey[yOffset]).getSorted(
          key,
          xOffset,
          yOffset + 1
        );
      }
    }
  }

  get(...key: KeyItemT[][]): T {
    key.forEach((subKey) => subKey.sort());
    return this.getSorted(key);
  }
}

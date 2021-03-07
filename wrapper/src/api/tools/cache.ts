import { LazyProperty } from './lazyProperty';
import { Primitive } from './types';

export class Cache<KeyItemT extends Primitive, T, KeyT extends KeyItemT[][]> {
  protected value?: T;
  protected readonly directSubcaches = new Map<
    KeyItemT,
    Cache<KeyItemT, T, KeyT>
  >();
  protected readonly nestedSubcache: LazyProperty<Cache<KeyItemT, T, KeyT>>;

  constructor(
    protected readonly create: (...key: KeyT) => T,
    protected readonly key?: KeyItemT
  ) {
    this.nestedSubcache = new LazyProperty(
      () => new Cache<KeyItemT, T, KeyT>(this.create)
    );
  }

  protected getOrAddDirectSubcache(key: KeyItemT): Cache<KeyItemT, T, KeyT> {
    let subcache = this.directSubcaches.get(key);
    if (!subcache) {
      subcache = new Cache<KeyItemT, T, KeyT>(this.create, key);
      this.directSubcaches.set(key, subcache);
    }
    return subcache;
  }

  protected getSorted(key: KeyT, xOffset = 0, yOffset = 0): T {
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

  get(...key: KeyT): T {
    key.forEach((subKey) => subKey.sort());
    return this.getSorted(key);
  }

  clear(): void {
    this.value = undefined;
    this.directSubcaches.clear();
    this.nestedSubcache.clear();
  }
  invalidate(key: KeyItemT): void {
    if (this.key === key) {
      this.clear();
    } else {
      this.nestedSubcache.valueNoCreate?.invalidate(key);
      for (const directSubCache of this.directSubcaches.values()) {
        directSubCache.invalidate(key);
      }
    }
  }
}

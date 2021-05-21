export class BasicCache<K, V> {
  protected readonly map = new Map<K, V>();
  constructor(protected readonly create: (key: K) => V) {}

  get(key: K): V {
    let value = this.map.get(key);
    if (!value) {
      value = this.create(key);
      this.map.set(key, value);
    }
    return value;
  }
}

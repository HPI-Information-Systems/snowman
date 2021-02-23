export class LazyProperty<T> {
  protected _value?: T;
  constructor(protected readonly creator: () => T) {}

  get value(): T {
    if (!this._value) {
      this._value = this.creator();
    }
    return this._value;
  }
}

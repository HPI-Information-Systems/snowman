export class LazyProperty<T> {
  protected _value?: T;
  constructor(protected readonly creator: () => T) {}

  get value(): T {
    if (!this._value) {
      this._value = this.creator();
    }
    return this._value;
  }

  get valueNoCreate(): T | undefined {
    return this._value;
  }

  clear(): void {
    this._value = undefined;
  }
}

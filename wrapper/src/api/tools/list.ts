interface ListNode<T> {
  next?: ListNode<T>;
  readonly value: T;
}

export class List<T> implements Iterable<T> {
  private first?: ListNode<T>;
  private last?: ListNode<T>;
  private _length = 0;

  get length(): number {
    return this._length;
  }

  removeFront(): void {
    if (this.first) {
      this._length--;
      this.first = this.first.next;
      if (!this.first) {
        this.last = undefined;
      }
    }
  }

  insertFront(element: T): void {
    this._length++;
    this.first = {
      value: element,
      next: this.first,
    };
    if (!this.last) {
      this.last = this.first;
    }
  }

  insertLast(element: T): void {
    this._length++;
    const newLast = {
      value: element,
    } as ListNode<T>;
    if (this.last) {
      this.last.next = newLast;
    } else {
      this.first = newLast;
    }
    this.last = newLast;
  }

  clear(): void {
    this._length = 0;
    this.first = undefined;
    this.last = undefined;
  }

  *[Symbol.iterator](): IterableIterator<T> {
    let node = this.first;
    while (node) {
      yield node.value;
      node = node.next;
    }
  }
}

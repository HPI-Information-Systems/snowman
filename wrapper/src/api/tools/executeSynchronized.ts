export class ExecuteSynchronized {
  private locks = new Map<number | undefined, Promise<unknown>>();
  private lockCounts = new Map<number | undefined, number>();

  private async waitForLock(id?: number): Promise<void> {
    const lock = this.locks.get(id);
    if (lock) {
      await lock;
    }
  }

  private getLockCount(id?: number): number {
    return this.lockCounts.get(id) ?? 0;
  }

  private increaseLockCount(id?: number) {
    const lockCount = this.getLockCount(id);
    this.lockCounts.set(id, lockCount + 1);
  }

  private decreaseLockCount(id?: number) {
    const lockCount = this.getLockCount(id);
    this.lockCounts.set(id, lockCount - 1);
  }

  private setLock(lock: Promise<unknown>, id?: number) {
    this.increaseLockCount(id);
    this.locks.set(
      id,
      lock.then(() => this.decreaseLockCount(id))
    );
  }

  call<ResultType>(
    func: () => Promise<ResultType> | ResultType,
    lockId?: number
  ): Promise<ResultType> {
    return new Promise<ResultType>((resolve, reject) => {
      this.setLock(
        this.waitForLock(lockId)
          .then(async () => {
            resolve(await func());
          })
          .catch((e) => {
            reject(e);
          }),
        lockId
      );
    });
  }

  isLocked(lockId?: number): boolean {
    return this.getLockCount(lockId) > 0;
  }
}

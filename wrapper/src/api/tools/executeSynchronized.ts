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

  call<ResultType>(
    func: () => Promise<ResultType> | ResultType,
    lockId?: number
  ): Promise<ResultType> {
    this.increaseLockCount(lockId);
    return new Promise<ResultType>((resolve, reject) => {
      this.locks.set(
        lockId,
        this.waitForLock(lockId)
          .then(async () => {
            const result = await func();
            this.decreaseLockCount(lockId);
            resolve(result);
          })
          .catch((e) => {
            this.decreaseLockCount(lockId);
            reject(e);
          })
      );
    });
  }

  isLocked(lockId?: number): boolean {
    return this.getLockCount(lockId) > 0;
  }
}

import { LazyProperty } from '../../../tools/lazyProperty';
import { databaseBackend } from '../../setup/backend';

export abstract class SchemaVersion {
  private _version = new LazyProperty(
    () => (this.predecessor?.version ?? -1) + 1
  );
  get version(): number {
    return this._version.value;
  }

  abstract readonly predecessor?: SchemaVersion;
  protected abstract migrateFromLastVersion(): Promise<void>;

  async migrate(fromVersion: number): Promise<void> {
    if (this.version !== fromVersion) {
      if (this.predecessor) {
        await this.predecessor.migrate(fromVersion);
        await this.migrateFromLastVersion();
        this.setVersion();
      } else {
        throw new Error(
          `Cannot migrate from database schema version ${fromVersion}: The version has not beend found.`
        );
      }
    }
  }

  static getInstalledVersion(): number {
    return +databaseBackend().pragma('user_version')[0].user_version;
  }

  setVersion(): void {
    databaseBackend().pragma(`user_version = ${this.version}`);
  }
}

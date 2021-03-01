import { databaseBackend } from '../setup/backend';

export abstract class SchemaVersion {
  abstract readonly version: number;
  abstract readonly successor?: SchemaVersion;
  protected abstract migrateFromLastVersion(): void;

  migrate(fromVersion: number): void {
    if (this.version !== fromVersion) {
      databaseBackend().transaction(() => {
        if (this.successor) {
          this.successor.migrate(fromVersion);
          this.migrateFromLastVersion();
          this.setVersion();
        } else {
          throw new Error(
            `Cannot migrate from database schema version ${fromVersion}: The version has not beend found.`
          );
        }
      })();
    }
  }

  static getInstalledVersion(): number {
    return +databaseBackend().pragma('user_version')[0].user_version;
  }

  setVersion(): void {
    databaseBackend().pragma(`user_version = ${this.version}`);
  }
}

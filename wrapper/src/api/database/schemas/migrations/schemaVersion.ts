import {
  mkdirpSync,
  pathExistsSync,
  readJSONSync,
  writeJSONSync,
} from 'fs-extra';
import { resolve } from 'path';

import { LazyProperty } from '../../../tools/lazyProperty';
import { SetupOptions } from '../../setup';
import { databaseVersionFile } from '../../tools/storageStructure';

export abstract class SchemaVersion {
  private _version = new LazyProperty(
    () => (this.predecessor?.version ?? -1) + 1
  );
  get version(): number {
    return this._version.value;
  }

  // Overwrite to reset and create a new database instead of migrating
  readonly performResetAsMigration: boolean = false;
  migrationRequiresReset(fromVersion: number): boolean {
    return (
      fromVersion !== this.version &&
      (this.performResetAsMigration ||
        (this.predecessor
          ? this.predecessor.migrationRequiresReset(fromVersion)
          : false))
    );
  }

  abstract readonly predecessor?: SchemaVersion;
  protected abstract migrateFromLastVersion(
    setupOptions: SetupOptions
  ): Promise<void>;

  async migrate(
    fromVersion: number,
    setupOptions: SetupOptions
  ): Promise<void> {
    if (this.version !== fromVersion) {
      if (this.predecessor) {
        await this.predecessor.migrate(fromVersion, setupOptions);
        await this.migrateFromLastVersion(setupOptions);
        this.setVersion(setupOptions.appPath);
      } else {
        throw new Error(
          `Cannot migrate from database schema version ${fromVersion}: The version has not beend found.`
        );
      }
    }
  }

  static getInstalledVersion(appPath: string): number {
    const versionFile = databaseVersionFile(appPath);
    return pathExistsSync(versionFile)
      ? readJSONSync(versionFile, {
          encoding: 'utf-8',
        })
      : 0;
  }

  setVersion(appPath: string): void {
    const versionFile = databaseVersionFile(appPath);
    mkdirpSync(resolve(versionFile, '..'));
    writeJSONSync(versionFile, this.version, {
      encoding: 'utf-8',
    });
  }
}

import chmodr from 'chmodr';
import { existsSync } from 'fs';
import { copySync, removeSync } from 'fs-extra';
import { MakeOptional } from 'snowman-library';

import { PREBUILT_DATABASE_APP_PATH } from '../../config';
import { schemas, tableSchemas } from '../schemas';
import { latest } from '../schemas/migrations';
import { SchemaVersion } from '../schemas/migrations/schemaVersion';
import { databaseFolder, mainDatabaseFile } from '../tools/storageStructure';
import { Schema, Schemas, TableSchema } from '../tools/types';
import { attachDatabases } from './attachDatabases';
import {
  databaseBackend,
  databaseBackendSubject,
  loadOrCreateMainDatabase,
} from './backend';
import { loadExamples } from './examples';
import { installTables } from './install';

export type SetupOptions = {
  temporary: boolean;
  appPath: string;
  loadExampleEntries: boolean;
  usePreBuiltDatabase: boolean;
  prebuiltAppPath: string;
};

class DatabaseSetup {
  readonly options: SetupOptions;
  protected applyDefaultOptions({
    temporary = false,
    appPath = __dirname,
    loadExampleEntries = true,
    usePreBuiltDatabase = false,
    prebuiltAppPath = PREBUILT_DATABASE_APP_PATH,
  }: MakeOptional<SetupOptions>): SetupOptions {
    return {
      temporary,
      appPath,
      loadExampleEntries,
      usePreBuiltDatabase,
      prebuiltAppPath,
    };
  }

  protected isInitialSetup: boolean;

  constructor(options: MakeOptional<SetupOptions>) {
    this.options = this.applyDefaultOptions(options);
    this.isInitialSetup =
      this.options.temporary ||
      !existsSync(mainDatabaseFile(this.options.appPath));
  }

  async setup(): Promise<void> {
    if (this.options.usePreBuiltDatabase) {
      this.resetIfRequired();
      this.options.usePreBuiltDatabase = false;
      this.importPrebuiltDatabaseIfRequired();
      this.loadDatabaseBackend();
      await this.initialSetupOrMigrate();
    }
  }

  protected resetIfRequired(): void {
    if (
      this.options.usePreBuiltDatabase ||
      (!this.isInitialSetup &&
        latest.migrationRequiresReset(
          SchemaVersion.getInstalledVersion(this.options.appPath)
        ))
    ) {
      removeSync(databaseFolder(this.options.appPath));
      this.isInitialSetup = true;
    }
  }

  protected importPrebuiltDatabaseIfRequired(): void {
    if (
      this.isInitialSetup &&
      !this.options.temporary &&
      this.options.usePreBuiltDatabase &&
      existsSync(mainDatabaseFile(this.options.prebuiltAppPath))
    ) {
      copySync(
        databaseFolder(this.options.prebuiltAppPath),
        databaseFolder(this.options.appPath),
        {
          overwrite: false,
          recursive: true,
          errorOnExist: true,
        }
      );
      chmodr.sync(databaseFolder(this.options.appPath), 0o600);
      this.isInitialSetup = false;
    }
  }

  protected loadDatabaseBackend(): void {
    loadOrCreateMainDatabase(this.options.temporary, this.options.appPath);
    attachDatabases(schemas, this.options.temporary, this.options.appPath);
    databaseBackendSubject.next(databaseBackend());
  }

  protected async initialSetupOrMigrate(): Promise<void> {
    if (this.isInitialSetup) {
      await this.initialDatabaseSetup();
    } else {
      await latest.migrate(
        SchemaVersion.getInstalledVersion(this.options.appPath),
        this.options
      );
    }
  }

  protected async initialDatabaseSetup(): Promise<void> {
    databaseBackend().transaction(() => {
      installTables(this.getTablesToBeAutoInstalled(), true);
    })();
    if (!this.options.temporary) {
      latest.setVersion(this.options.appPath);
    }
    if (this.options.loadExampleEntries) {
      await loadExamples();
    }
  }

  protected getTablesToBeAutoInstalled(): TableSchema[] {
    return Object.values(tableSchemas).flatMap(
      (schema) =>
        (Object.values(schema) as Schemas[Schema][string][]).filter(
          (table) => typeof table !== 'function' && table.autoInstall
        ) as TableSchema[]
    );
  }
}

export async function setupDatabase(
  options: MakeOptional<SetupOptions>
): Promise<void> {
  return await new DatabaseSetup(options).setup();
}

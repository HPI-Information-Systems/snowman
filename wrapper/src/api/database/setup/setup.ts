import { existsSync } from 'fs';
import { copySync } from 'fs-extra';

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

export async function setupDatabase({
  temporary = false,
  appPath = __dirname,
  loadExampleEntries = true,
  usePreBuiltDatabase = false,
  prebuiltAppPath = PREBUILT_DATABASE_APP_PATH,
}: {
  temporary?: boolean;
  appPath?: string;
  loadExampleEntries?: boolean;
  usePreBuiltDatabase?: boolean;
  prebuiltAppPath?: string;
}): Promise<void> {
  let isInitialSetup = temporary || !existsSync(mainDatabaseFile(appPath));
  if (isInitialSetup && !temporary && usePreBuiltDatabase) {
    importPrebuiltDatabase(appPath, prebuiltAppPath);
    isInitialSetup = !existsSync(mainDatabaseFile(appPath));
  }
  loadOrCreateMainDatabase(temporary, appPath);
  attachDatabases(schemas, temporary, appPath);
  databaseBackendSubject.next(databaseBackend());
  if (isInitialSetup) {
    await initialDatabaseSetup(loadExampleEntries);
  } else {
    await latest.migrate(
      SchemaVersion.getInstalledVersion(),
      loadExampleEntries
    );
  }
}

function importPrebuiltDatabase(
  appPath: string,
  preBuiltDatabaseAppPath: string
) {
  copySync(databaseFolder(preBuiltDatabaseAppPath), databaseFolder(appPath), {
    overwrite: false,
    recursive: true,
    errorOnExist: true,
  });
}

async function initialDatabaseSetup(loadExampleEntries: boolean) {
  databaseBackend().transaction(() => {
    installTables(getTablesToBeAutoInstalled(), true);
    latest.setVersion();
  })();
  if (loadExampleEntries) {
    await loadExamples();
  }
}

function getTablesToBeAutoInstalled(): TableSchema[] {
  return Object.values(tableSchemas).flatMap(
    (schema) =>
      (Object.values(schema) as Schemas[Schema][string][]).filter(
        (table) => typeof table !== 'function' && table.autoInstall
      ) as TableSchema[]
  );
}

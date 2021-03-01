import { existsSync } from 'fs';

import { latest } from '../schemas';
import { SchemaVersion } from '../schemas/schemaVersion';
import { mainDatabaseFile } from '../tools/storageStructure';
import { Schema, Schemas, TableSchema } from '../tools/types';
import { attachDatabases } from './attachDatabases';
import { databaseBackend, loadOrCreateMainDatabase } from './backend';
import { loadExamples } from './examples';
import { installTables } from './install';

export async function setupDatabase({
  temporary = false,
  appPath = __dirname,
  loadExampleEntries = true,
}: {
  temporary?: boolean;
  appPath?: string;
  loadExampleEntries?: boolean;
}): Promise<void> {
  const isInitialSetup = temporary || !existsSync(mainDatabaseFile(appPath));
  loadOrCreateMainDatabase(temporary, appPath);
  attachDatabases(latest.schemas, temporary, appPath);
  if (isInitialSetup) {
    await initialDatabaseSetup(loadExampleEntries);
  } else {
    latest.version.migrate(SchemaVersion.getInstalledVersion());
  }
}

async function initialDatabaseSetup(loadExampleEntries: boolean) {
  databaseBackend().transaction(() => {
    installTables(getTablesToBeAutoInstalled(), true);
    latest.version.setVersion();
  })();
  if (loadExampleEntries) {
    await loadExamples();
  }
}

function getTablesToBeAutoInstalled(): TableSchema[] {
  return Object.values(latest.tableSchemas).flatMap(
    (schema) =>
      (Object.values(schema) as Schemas[Schema][string][]).filter(
        (table) => typeof table !== 'function' && table.autoInstall
      ) as TableSchema[]
  );
}

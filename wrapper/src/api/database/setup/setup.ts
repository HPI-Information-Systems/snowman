import { existsSync } from 'fs';

import { schemas, tableSchemas } from '../schemas';
import { mainDatabaseFile } from '../tools/storageStructure';
import { Schema, Schemas, TableSchema } from '../tools/types';
import { attachDatabases } from './attachDatabases';
import { loadOrCreateMainDatabase } from './backend';
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
  const initialSetup = temporary || !existsSync(mainDatabaseFile(appPath));
  loadOrCreateMainDatabase(temporary, appPath);
  attachDatabases(schemas, temporary, appPath);
  installTables(getTablesToBeAutoInstalled());
  if (initialSetup && loadExampleEntries) {
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

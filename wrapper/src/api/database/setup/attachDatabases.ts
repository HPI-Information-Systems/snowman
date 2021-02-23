import { databaseFileForSchema } from '../tools/storageStructure';
import { Schema } from '../tools/types';
import { databaseBackend } from './backend';
import { configureDatabase } from './configureDatabase';

export function attachDatabases(
  schemas: readonly Schema[],
  temporary = false,
  appPath: string = __dirname
): void {
  for (const schema of schemas) {
    databaseBackend().exec(
      `ATTACH DATABASE '${
        temporary ? ':memory:' : databaseFileForSchema(schema, appPath)
      }' AS '${schema}'`
    );
    configureDatabase(schema, temporary);
  }
}

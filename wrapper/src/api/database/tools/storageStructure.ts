import { join } from 'path';

export function databaseFolder(appPath: string): string {
  return join(appPath, 'database_files');
}

export function mainDatabaseFile(appPath: string): string {
  return join(databaseFolder(appPath), 'data-matching-benchmark.db');
}
export function databaseFileForSchema(schema: string, appPath: string): string {
  return join(databaseFolder(appPath), schema + '.db');
}

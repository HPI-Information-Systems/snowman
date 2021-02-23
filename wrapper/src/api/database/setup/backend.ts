import Database, { Database as DatabaseType } from 'better-sqlite3';
import { mkdirSync } from 'fs';

import { databaseFolder, mainDatabaseFile } from '../tools/storageStructure';
import { configureDatabase } from './configureDatabase';

let _databaseBackend: DatabaseType | undefined;

export function databaseBackend(): DatabaseType {
  if (!_databaseBackend) {
    throw new Error('No database loaded yet.');
  }
  return _databaseBackend;
}

function createDatabaseFolder(appPath: string): void {
  mkdirSync(databaseFolder(appPath), {
    recursive: true,
  });
}

export function loadOrCreateMainDatabase(
  temporary = false,
  appPath = __dirname
): void {
  if (!temporary) {
    createDatabaseFolder(appPath);
  }
  _databaseBackend = new Database(
    temporary ? ':memory:' : mainDatabaseFile(appPath)
  );
  _databaseBackend.pragma('foreign_keys=1');
  _databaseBackend.pragma(`temp_store = MEMORY`);
  configureDatabase(undefined, temporary);
}

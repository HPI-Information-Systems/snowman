import { Schema } from '../tools/types';
import { databaseBackend } from './backend';

export function configureDatabase(schema?: Schema, temporary = false): void {
  const prefix = schema ? `"${schema}".` : '';
  if (!temporary) {
    databaseBackend().pragma(`${prefix}journal_mode = WAL`);
    databaseBackend().pragma(`${prefix}synchronous = OFF`);
    databaseBackend().pragma(`${prefix}cache_size = -20000`);
  }
}

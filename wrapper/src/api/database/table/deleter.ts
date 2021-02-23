import { databaseBackend } from '../setup/backend';
import type { TableSchema } from '../tools/types';
import type { Table } from './table';

export class TableDeleter<Schema extends TableSchema> {
  constructor(private readonly table: Table<Schema>) {}

  deleteTable(raiseIfNotExists = false): void {
    const query = this.deleteTableQuery(raiseIfNotExists);
    databaseBackend().exec(query);
  }

  private deleteTableQuery(raiseIfNotExists: boolean) {
    return `DROP TABLE ${raiseIfNotExists ? '' : 'IF EXISTS '}${this.table}`;
  }
}

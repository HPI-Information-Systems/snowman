import { Cache } from '../../tools/cache';
import { databaseBackend } from '../setup/backend';
import type { NullableColumnValues, TableSchema } from '../tools/types';
import type { Table } from './table';

export class TableDeleter<Schema extends TableSchema> {
  protected readonly deleteRowStatementCache = new Cache((columns: string[]) =>
    databaseBackend().prepare(this.createDeleteRowQuery(columns))
  );

  constructor(private readonly table: Table<Schema>) {}

  delete(filter: NullableColumnValues<Schema['columns']> = {}): void {
    const filters = Object.keys(filter).sort();
    this.deleteRowStatementCache
      .get(filters)
      .run(...filters.map((key) => filter[key]));
  }

  protected createDeleteRowQuery(columns: string[]): string {
    let deleteQuery = `DELETE FROM ${this.table}`;
    if (columns.length > 0) {
      deleteQuery += ` WHERE ${columns
        .map((column) => `"${column}" = ?`)
        .join(' AND ')}`;
    }
    return deleteQuery;
  }

  dropTable(raiseIfNotExists = false): void {
    const query = this.deleteTableQuery(raiseIfNotExists);
    databaseBackend().exec(query);
  }

  private deleteTableQuery(raiseIfNotExists: boolean) {
    return `DROP TABLE ${raiseIfNotExists ? '' : 'IF EXISTS '}${this.table}`;
  }
}

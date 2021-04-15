import { SortedCache } from '../../tools/cache/sorted';
import { databaseBackend } from '../setup/backend';
import type { NullableColumnValues, TableSchema } from '../tools/types';
import { FilterT } from './getter';
import type { Table } from './table';

export class TableDeleter<Schema extends TableSchema> {
  protected readonly deleteRowStatementCache = new SortedCache(
    (...args: Parameters<TableDeleter<Schema>['createDeleteRowQuery']>) =>
      databaseBackend().prepare(this.createDeleteRowQuery(...args))
  );

  constructor(private readonly table: Table<Schema>) {}

  delete(
    filter: NullableColumnValues<Schema['columns']> = {},
    filterType: FilterT = '='
  ): void {
    const filters = Object.keys(filter).sort();
    this.deleteRowStatementCache
      .get(filters, [filterType])
      .run(...filters.map((key) => filter[key]));
  }

  protected createDeleteRowQuery(
    filter: string[],
    [filterType]: [string]
  ): string {
    let deleteQuery = `DELETE FROM ${this.table}`;
    if (filter.length > 0) {
      deleteQuery += ` WHERE ${filter
        .map((column) => `"${column}" ${filterType} ?`)
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

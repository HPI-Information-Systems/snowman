import { Cache } from '../../tools/cache';
import { databaseBackend } from '../setup/backend';
import {
  ColumnValues,
  NullableColumnValues,
  TableSchema,
} from '../tools/types';
import { Table } from './table';

export class TableGetter<Schema extends TableSchema> {
  protected readonly statementCache = new Cache((columns: string[]) =>
    databaseBackend().prepare(this.createQuery(columns))
  );

  constructor(protected readonly table: Table<Schema>) {}

  all(
    filter: NullableColumnValues<Schema['columns']> = {}
  ): ColumnValues<Schema['columns']>[] {
    const filters = Object.keys(filter).sort();
    return this.statementCache
      .get(filters)
      .all(...filters.map((key) => filter[key]));
  }

  get(
    filter: NullableColumnValues<Schema['columns']> = {}
  ): ColumnValues<Schema['columns']> | undefined {
    const filters = Object.keys(filter).sort();
    return this.statementCache
      .get(filters)
      .get(...filters.map((key) => filter[key]));
  }

  protected createQuery(columns: string[]): string {
    let selectQuery = `SELECT * FROM ${this.table}`;
    if (columns.length > 0) {
      selectQuery += ` WHERE ${columns
        .map((column) => `"${column}" = ?`)
        .join(' AND ')}`;
    }
    return selectQuery;
  }
}

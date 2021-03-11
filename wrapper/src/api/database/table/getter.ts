import { Cache } from '../../tools/cache';
import { databaseBackend } from '../setup/backend';
import { TableSchema, TSDataType } from '../tools/types';
import { Table } from './table';

type ColumnsReturnType<Columns extends TableSchema['columns']> = {
  [key in keyof Columns]: Columns[key]['notNull'] extends true
    ? TSDataType<Columns[key]['dataType']>
    : TSDataType<Columns[key]['dataType']> | null;
};

export type Filter<Columns extends TableSchema['columns']> = {
  [key in keyof Columns]?: TSDataType<Columns[key]['dataType']>;
};

export class TableGetter<Schema extends TableSchema> {
  protected statementCache = new Cache((columns: string[]) =>
    databaseBackend().prepare(this.createQuery(columns))
  );

  constructor(private readonly table: Table<Schema>) {}

  all(
    filter: Filter<Schema['columns']> = {}
  ): ColumnsReturnType<Schema['columns']>[] {
    const filters = Object.keys(filter).sort();
    return this.statementCache
      .get(filters)
      .all(filters.map((key) => filter[key]));
  }

  get(
    filter: Filter<Schema['columns']> = {}
  ): ColumnsReturnType<Schema['columns']> | undefined {
    const filters = Object.keys(filter).sort();
    return this.statementCache
      .get(filters)
      .get(filters.map((key) => filter[key]));
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

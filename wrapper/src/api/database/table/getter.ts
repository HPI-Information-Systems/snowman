import { Cache } from '../../tools/cache/base';
import { Primitive } from '../../tools/types';
import { databaseBackend } from '../setup/backend';
import {
  ColumnDataType,
  ColumnValues,
  NullableColumnValues,
  TableSchema,
} from '../tools/types';
import { Table } from './table';

export type GetterOptionsT<
  ColumnsT extends TableSchema['columns'],
  RawT extends boolean
> = {
  returnedColumns?: (keyof ColumnsT)[];
  raw?: RawT;
  limit?: number;
  startAt?: number;
  sortBy?: (keyof ColumnsT)[];
  filterType?: '=' | '<' | '>' | '>=' | '<=';
};

export class TableGetter<Schema extends TableSchema> {
  protected readonly statementCache = new Cache(
    (
      filters: string[],
      returnColumns: string[],
      sortBy: string[],
      [filterType]: [string]
    ) =>
      databaseBackend().prepare(
        this.createQuery(filters, returnColumns, sortBy, filterType)
      )
  );

  constructor(protected readonly table: Table<Schema>) {}

  private query(
    operation: 'get' | 'all',
    filters: NullableColumnValues<Schema['columns']> &
      Record<string, Primitive> = {},
    {
      returnedColumns = [],
      raw = false,
      limit = -1,
      startAt = 0,
      filterType = '=',
      sortBy = [],
    }: GetterOptionsT<Schema['columns'], boolean> = {}
  ) {
    const filterKeys = Object.keys(filters).sort();
    return this.statementCache
      .get(filterKeys, returnedColumns as string[], sortBy as string[], [
        filterType,
      ])
      .raw(raw)
      [operation](...filterKeys.map((key) => filters[key]), limit, startAt);
  }

  get<RawT extends boolean = false>(
    filters: NullableColumnValues<Schema['columns']> &
      Record<string, Primitive> = {},
    options?: GetterOptionsT<Schema['columns'], RawT>
  ):
    | undefined
    | (RawT extends false
        ? ColumnValues<Schema['columns']>
        : ColumnDataType<Schema['columns'][keyof Schema['columns']]>[]) {
    return this.query('get', filters, options);
  }

  all<RawT extends boolean = false>(
    filters: NullableColumnValues<Schema['columns']> &
      Record<string, Primitive> = {},
    options?: GetterOptionsT<Schema['columns'], RawT>
  ): RawT extends false
    ? ColumnValues<Schema['columns']>[]
    : ColumnDataType<Schema['columns'][keyof Schema['columns']]>[][] {
    return this.query('all', filters, options);
  }

  protected createQuery(
    filters: string[],
    returnColumns: string[],
    sortBy: string[],
    filterType: string
  ): string {
    let selectQuery = 'SELECT ';
    if (returnColumns.length > 0) {
      selectQuery += returnColumns.map((column) => `"${column}"`).join(',');
    } else {
      selectQuery += '*';
    }
    selectQuery += ` FROM ${this.table}`;
    if (filters.length > 0) {
      selectQuery += ` WHERE ${filters
        .map((column) => `"${column}" ${filterType} ?`)
        .join(' AND ')}`;
    }
    if (sortBy.length > 0) {
      selectQuery += ` ORDER BY ${sortBy
        .map((column) => `"${column}"`)
        .join(',')}`;
    }
    selectQuery += ` LIMIT ? OFFSET ?`;
    return selectQuery;
  }
}

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

type OptionsT<ColumnsT extends TableSchema['columns'], RawT extends boolean> = {
  returnedColumns?: readonly (keyof ColumnsT | string)[];
  raw?: RawT;
  limit?: number;
  startAt?: number;
  sortBy?: keyof ColumnsT | string;
  filterType?: '=' | '<' | '>' | '>=' | '<=';
};

export class TableGetter<Schema extends TableSchema> {
  protected readonly statementCache = new Cache(
    (
      filters: string[],
      returnColumns: string[],
      [sortBy, filterType]: [string | undefined, string]
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
      sortBy,
    }: OptionsT<Schema['columns'], boolean> = {}
  ) {
    const filterKeys = Object.keys(filters).sort();
    return this.statementCache
      .get(filterKeys, returnedColumns as string[], [
        sortBy as string,
        filterType,
      ])
      .raw(raw)
      [operation](...filterKeys.map((key) => filters[key]), limit, startAt);
  }

  /**
   * !DOES NOT ESCAPE FILTER KEYS, RETURNED COLUMNS OR SORTBY
   */
  get<RawT extends boolean = false>(
    filters: NullableColumnValues<Schema['columns']> &
      Record<string, Primitive> = {},
    options?: OptionsT<Schema['columns'], RawT>
  ):
    | undefined
    | (RawT extends false
        ? ColumnValues<Schema['columns']>
        : ColumnDataType<Schema['columns'][keyof Schema['columns']]>[]) {
    return this.query('get', filters, options);
  }

  /**
   * !DOES NOT ESCAPE FILTER KEYS, RETURNED COLUMNS OR SORTBY
   */
  all<RawT extends boolean = false>(
    filters: NullableColumnValues<Schema['columns']> &
      Record<string, Primitive> = {},
    options?: OptionsT<Schema['columns'], RawT>
  ): RawT extends false
    ? ColumnValues<Schema['columns']>[]
    : ColumnDataType<Schema['columns'][keyof Schema['columns']]>[][] {
    return this.query('all', filters, options);
  }

  protected createQuery(
    filters: string[],
    returnColumns: string[],
    sortBy: string | undefined,
    filterType: string
  ): string {
    let selectQuery = 'SELECT ';
    if (returnColumns.length > 0) {
      selectQuery += returnColumns.map((column) => `${column}`).join(',');
    } else {
      selectQuery += '*';
    }
    selectQuery += ` FROM ${this.table}`;
    if (filters.length > 0) {
      selectQuery += ` WHERE ${filters
        .map((filter) => `${filter} ${filterType} ?`)
        .join(' AND ')}`;
    }
    if (sortBy) {
      selectQuery += ` ORDER BY ${sortBy}`;
    }
    selectQuery += ` LIMIT ? OFFSET ?`;
    return selectQuery;
  }
}

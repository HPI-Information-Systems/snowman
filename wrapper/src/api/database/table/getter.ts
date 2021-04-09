import { SortedCache } from '../../tools/cache/sorted';
import { databaseBackend } from '../setup/backend';
import {
  ColumnDataType,
  ColumnValues,
  NullableColumnValues,
  TableSchema,
} from '../tools/types';
import { Table } from './table';

type OptionsT<ColumnT extends string | number | symbol> = {
  limit?: number;
  startAt?: number;
  sortBy?: ColumnT;
};

export class TableGetter<Schema extends TableSchema> {
  protected readonly statementCache = new SortedCache(
    (filterColumns: string[], returnColumns: string[], [sortBy]: [string]) =>
      databaseBackend().prepare(
        this.createQuery(filterColumns, returnColumns, sortBy)
      )
  );

  constructor(protected readonly table: Table<Schema>) {}

  private query(
    operation: 'get' | 'all',
    filter: NullableColumnValues<Schema['columns']> = {},
    returnedColumns: readonly (keyof Schema['columns'])[] = [],
    raw = false,
    {
      limit = -1,
      startAt = 0,
      sortBy = undefined,
    }: OptionsT<keyof Schema['columns']> = {}
  ) {
    const filters = Object.keys(filter).sort();
    return this.statementCache
      .get(filters, returnedColumns as string[], [sortBy as string])
      .raw(raw)
      [operation](...filters.map((key) => filter[key]), limit, startAt);
  }

  /**
   * !WARNING: If raw returns columns in ASCENDING SORTED ORDER
   */
  get<
    RawT extends boolean = false,
    ReturnedColumnsT extends readonly (keyof Schema['columns'])[] = []
  >(
    filter: NullableColumnValues<Schema['columns']> = {},
    returnedColumns?: ReturnedColumnsT,
    raw?: RawT,
    options?: OptionsT<keyof Schema['columns']>
  ):
    | undefined
    | (RawT extends false
        ? ColumnValues<Schema['columns']>
        : ColumnDataType<Schema['columns'][ReturnedColumnsT[number]]>[]) {
    return this.query('get', filter, returnedColumns, raw, options);
  }

  /**
   * !WARNING: If raw returns columns in ASCENDING SORTED ORDER
   */
  all<
    RawT extends boolean = false,
    ReturnedColumnsT extends readonly (keyof Schema['columns'])[] = []
  >(
    filter: NullableColumnValues<Schema['columns']> = {},
    returnedColumns?: ReturnedColumnsT,
    raw?: RawT,
    options?: OptionsT<keyof Schema['columns']>
  ): RawT extends false
    ? ColumnValues<Schema['columns']>[]
    : ColumnDataType<Schema['columns'][ReturnedColumnsT[number]]>[][] {
    return this.query('all', filter, returnedColumns, raw, options);
  }

  protected createQuery(
    filterColumns: string[],
    returnColumns: string[],
    sortBy: string
  ): string {
    let selectQuery = 'SELECT ';
    if (returnColumns.length > 0) {
      selectQuery += returnColumns.map((column) => `"${column}"`).join(',');
    } else {
      selectQuery += '*';
    }
    selectQuery += ` FROM ${this.table}`;
    if (filterColumns.length > 0) {
      selectQuery += ` WHERE ${filterColumns
        .map((column) => `"${column}" = ?`)
        .join(' AND ')}`;
    }
    if (sortBy) {
      selectQuery += ` ORDER BY "${sortBy}"`;
    }
    selectQuery += ` LIMIT ? OFFSET ?`;
    return selectQuery;
  }
}

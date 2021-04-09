import { PartiallySortedCache } from '../../tools/cache/partiallySorted';
import { databaseBackend } from '../setup/backend';
import {
  ColumnDataType,
  ColumnValues,
  NullableColumnValues,
  TableSchema,
} from '../tools/types';
import { Table } from './table';

type OptionsT<ColumnsT extends TableSchema['columns'], RawT extends boolean> = {
  returnedColumns?: readonly (keyof ColumnsT)[];
  raw?: RawT;
  limit?: number;
  startAt?: number;
  sortBy?: keyof ColumnsT;
};

export class TableGetter<Schema extends TableSchema> {
  protected readonly statementCache = new PartiallySortedCache(
    (filterColumns: string[], returnColumns: string[], [sortBy]: [string]) =>
      databaseBackend().prepare(
        this.createQuery(filterColumns, returnColumns, sortBy)
      ),
    [
      {
        sortBy: 0,
        toSort: [0],
      },
    ]
  );

  constructor(protected readonly table: Table<Schema>) {}

  private query(
    operation: 'get' | 'all',
    filter: NullableColumnValues<Schema['columns']> = {},
    {
      returnedColumns = [],
      raw = false,
      limit = -1,
      startAt = 0,
      sortBy = undefined,
    }: OptionsT<Schema['columns'], boolean> = {}
  ) {
    const filters = Object.keys(filter).sort();
    return this.statementCache
      .get(filters, returnedColumns as string[], [sortBy as string])
      .raw(raw)
      [operation](...filters.map((key) => filter[key]), limit, startAt);
  }

  get<RawT extends boolean = false>(
    filter: NullableColumnValues<Schema['columns']> = {},
    options?: OptionsT<Schema['columns'], RawT>
  ):
    | undefined
    | (RawT extends false
        ? ColumnValues<Schema['columns']>
        : ColumnDataType<Schema['columns'][keyof Schema['columns']]>[]) {
    return this.query('get', filter, options);
  }

  all<RawT extends boolean = false>(
    filter: NullableColumnValues<Schema['columns']> = {},
    options?: OptionsT<Schema['columns'], RawT>
  ): RawT extends false
    ? ColumnValues<Schema['columns']>[]
    : ColumnDataType<Schema['columns'][keyof Schema['columns']]>[][] {
    return this.query('all', filter, options);
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

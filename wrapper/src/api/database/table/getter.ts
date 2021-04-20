import { BasicCache } from '../../tools/cache';
import { databaseBackend } from '../setup/backend';
import {
  ColumnDataType,
  ColumnValues,
  NullableColumnValues,
  TableSchema,
} from '../tools/types';
import { Table } from './table';

export type FilterT = '=' | '<' | '>' | '>=' | '<=' | 'LIKE';
export type AdvancedFilterT<ColumnsT extends TableSchema['columns']> = [
  key: keyof ColumnsT,
  filterType: FilterT,
  value: ColumnDataType<ColumnsT[keyof ColumnsT]>
][];

export type GetterOptionsT<
  ColumnsT extends TableSchema['columns'],
  RawT extends boolean
> = {
  returnedColumns?: (keyof ColumnsT)[];
  raw?: RawT;
  limit?: number;
  startAt?: number;
  sortBy?: (keyof ColumnsT)[];
  advancedFilters?: AdvancedFilterT<ColumnsT>;
};

export class TableGetter<Schema extends TableSchema> {
  protected readonly statementCache = new BasicCache((statement: string) =>
    databaseBackend().prepare(statement)
  );

  constructor(protected readonly table: Table<Schema>) {}

  private query(
    operation: 'get' | 'all',
    filters: NullableColumnValues<Schema['columns']> = {},
    {
      returnedColumns = [],
      raw = false,
      limit = -1,
      startAt = 0,
      sortBy = [],
      advancedFilters = [],
    }: GetterOptionsT<Schema['columns'], boolean> = {}
  ) {
    advancedFilters = advancedFilters.slice();
    advancedFilters.push(
      ...Object.entries(filters).map(
        ([key, value]: [
          keyof typeof filters,
          typeof filters[keyof typeof filters]
        ]) => [key, '=', value] as AdvancedFilterT<Schema['columns']>[number]
      )
    );
    advancedFilters.sort(([key1], [key2]) =>
      key1 < key2 ? 1 : key1 > key2 ? -1 : 0
    );
    return this.statementCache
      .get(
        this.createQuery(
          returnedColumns as string[],
          sortBy as string[],
          ...(advancedFilters.map(([key, filterT]) => [key, filterT]) as [
            key: string,
            filterType: FilterT
          ][])
        )
      )
      .raw(raw)
      [operation](
        ...advancedFilters.map(([_, _2, value]) => value),
        limit,
        startAt
      );
  }

  get<RawT extends boolean = false>(
    filters?: NullableColumnValues<Schema['columns']>,
    options?: GetterOptionsT<Schema['columns'], RawT>
  ):
    | undefined
    | (RawT extends false
        ? ColumnValues<Schema['columns']>
        : ColumnDataType<Schema['columns'][keyof Schema['columns']]>[]) {
    return this.query('get', filters, options);
  }

  all<RawT extends boolean = false>(
    filters?: NullableColumnValues<Schema['columns']>,
    options?: GetterOptionsT<Schema['columns'], RawT>
  ): RawT extends false
    ? ColumnValues<Schema['columns']>[]
    : ColumnDataType<Schema['columns'][keyof Schema['columns']]>[][] {
    return this.query('all', filters, options);
  }

  protected createQuery(
    returnColumns: string[],
    sortBy: string[],
    ...filters: [key: string, filterType: FilterT][]
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
        .map(([column, filterType]) => `"${column}" ${filterType} ?`)
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

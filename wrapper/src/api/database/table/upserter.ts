import { Statement } from 'better-sqlite3';

import { Cache } from '../../tools/cache';
import { databaseBackend } from '../setup/backend';
import type {
  BasicDataType,
  DataTypes,
  InsertColumnValues,
  TableSchema,
} from '../tools/types';
import type { Table } from './table';

export class TableUpserter<Schema extends TableSchema> {
  protected readonly statementCache = new Cache((columns: string[]) =>
    this.createInsertStatement(columns)
  );
  protected readonly cachedRows: (() => InsertColumnValues<
    Schema['columns']
  >)[] = [];

  constructor(protected readonly table: Table<Schema>) {}

  upsert(rows: InsertColumnValues<Schema['columns']>[]): number[] {
    const insertedRowIds: number[] = [];
    databaseBackend().transaction(() => {
      for (const row of rows) {
        const columns = Object.keys(row)
          .filter((column) => column !== undefined)
          .sort() as (string & keyof typeof row)[];
        insertedRowIds.push(
          +this.statementCache
            .get(columns)
            .run(
              ...(columns.map(
                (column) => row[column] ?? null
              ) as BasicDataType<DataTypes>[])
            ).lastInsertRowid
        );
      }
    })();
    return insertedRowIds;
  }

  batchUpsert(
    rows: (() => InsertColumnValues<Schema['columns']>)[],
    commitAfterBatchSize?: number
  ): number[] {
    this.cachedRows.push(...rows);
    if (
      typeof commitAfterBatchSize === 'number' &&
      this.cachedRows.length >= commitAfterBatchSize
    ) {
      return this.flushBatchUpsert();
    } else {
      return [];
    }
  }

  flushBatchUpsert(): number[] {
    let rowIds: number[];
    databaseBackend().transaction(() => {
      rowIds = this.upsert(this.cachedRows.map((rowGetter) => rowGetter()));
    })();
    this.cachedRows.length = 0;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return rowIds!;
  }

  private createInsertStatement(
    columns: string[]
  ): Statement<BasicDataType<DataTypes>[]> {
    let insertStatement = `INSERT OR REPLACE INTO ${this.table}`;
    if (columns.length === 0) {
      insertStatement += ` DEFAULT VALUES`;
    } else {
      insertStatement += `(${columns.map((column) => '"' + column + '"')})
                   VALUES (${columns.map(() => '?')})`;
    }
    return databaseBackend().prepare<BasicDataType[]>(insertStatement);
  }
}

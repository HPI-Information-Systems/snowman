import { extend } from '../../tools/array';
import { BasicCache } from '../../tools/cache';
import { databaseBackend } from '../setup/backend';
import type {
  BasicDataType,
  DataTypes,
  InsertColumnValues,
  TableSchema,
} from '../tools/types';
import type { Table } from './table';

export class TableUpserter<Schema extends TableSchema> {
  protected readonly statementCache = new BasicCache((statement: string) =>
    databaseBackend().prepare<BasicDataType[]>(statement)
  );
  protected readonly cachedRows: (() => InsertColumnValues<
    Schema['columns']
  >)[] = [];

  constructor(protected readonly table: Table<Schema>) {}

  upsert(rows: InsertColumnValues<Schema['columns']>[]): number[] {
    return databaseBackend().transaction(() => {
      const insertedRowIds: number[] = [];
      for (const row of rows) {
        const columns = Object.keys(row)
          .filter((column) => column !== undefined)
          .sort() as (string & keyof typeof row)[];
        insertedRowIds.push(
          +this.statementCache
            .get(this.createInsertStatement(columns))
            .run(
              ...(columns.map(
                (column) => row[column] ?? null
              ) as BasicDataType<DataTypes>[])
            ).lastInsertRowid
        );
      }
      return insertedRowIds;
    })();
  }

  batchUpsert(
    rows: (() => InsertColumnValues<Schema['columns']>)[],
    commitAfterBatchSize?: number
  ): number[] {
    extend(this.cachedRows, rows);
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
    return databaseBackend().transaction(() => {
      const rowIds = this.upsert(
        this.cachedRows.map((rowGetter) => rowGetter())
      );
      this.cachedRows.length = 0;
      return rowIds;
    })();
  }

  private createInsertStatement(columns: string[]): string {
    let insertStatement = `INSERT OR REPLACE INTO ${this.table}`;
    if (columns.length === 0) {
      insertStatement += ` DEFAULT VALUES`;
    } else {
      insertStatement += `(${columns.map((column) => '"' + column + '"')})
                   VALUES (${columns.map(() => '?')})`;
    }
    return insertStatement;
  }
}

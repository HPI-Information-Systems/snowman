import { Statement } from 'better-sqlite3';

import { Cache } from '../../tools/cache';
import { databaseBackend } from '../setup/backend';
import type {
  BasicDataType,
  DataTypes,
  NullableColumnValues,
  TableSchema,
} from '../tools/types';
import type { Table } from './table';

export class TableInserter<Schema extends TableSchema> {
  protected readonly statementCache = new Cache((columns: string[]) =>
    this.createInsertStatement(columns)
  );
  protected readonly cachedRows: (() => NullableColumnValues<
    Schema['columns']
  >)[] = [];

  constructor(protected readonly table: Table<Schema>) {}

  insert(...rows: NullableColumnValues<Schema['columns']>[]): number[] {
    return this.batchInsert(
      rows.map((row) => () => row),
      1
    );
  }

  batchInsert(
    rows: (() => NullableColumnValues<Schema['columns']>)[],
    commitAfterBatchSize?: number
  ): number[] {
    this.cachedRows.push(...rows);
    if (
      typeof commitAfterBatchSize === 'number' &&
      this.cachedRows.length >= commitAfterBatchSize
    ) {
      return this.flushBatchInsert();
    } else {
      return [];
    }
  }

  flushBatchInsert(): number[] {
    const insertedRowIds: number[] = [];
    databaseBackend().transaction(() => {
      for (const rowGetter of this.cachedRows) {
        const row = rowGetter();
        const columns = Object.keys(row).sort();
        insertedRowIds.push(
          +this.statementCache
            .get(columns)
            .run(
              ...(columns
                .map((column) => row[column])
                .filter(
                  (value) => value !== undefined
                ) as BasicDataType<DataTypes>[])
            ).lastInsertRowid
        );
      }
    })();
    this.cachedRows.length = 0;
    return insertedRowIds;
  }

  private createInsertStatement(
    columns: string[]
  ): Statement<BasicDataType<DataTypes>[]> {
    return databaseBackend().prepare<BasicDataType[]>(`
          INSERT OR REPLACE INTO ${this.table}
                 (${columns.map((column) => '"' + column + '"')})
          VALUES (${columns.map(() => '?')})`);
  }
}

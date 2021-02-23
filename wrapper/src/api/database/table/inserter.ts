import { Statement } from 'better-sqlite3';

import { ValueOf } from '../../tools/types';
import { databaseBackend } from '../setup/backend';
import { Column, TableSchema } from '../tools/types';
import type { Table } from './table';

export type InsertParameters<Schema extends TableSchema> = ({
  column: Schema['columns'][string];
  value: null | string | number;
} & (
  | { column: { dataType: 'NULL' }; value: null }
  | {
      column: { dataType: 'REAL' | 'INTEGER' };
      value: number;
    }
  | {
      column: { dataType: 'BLOB' | 'TEXT' };
      value: string;
    }
  | {
      column: { dataType: 'REAL' | 'INTEGER'; notNull?: false };
      value: number | null;
    }
  | {
      column: { dataType: 'BLOB' | 'TEXT'; notNull?: false };
      value: string | null;
    }
) & { column: { autoIncrement?: false } })[][];

type InsertableType = string | number | null;

export class TableInserter<Schema extends TableSchema> {
  private readonly insertStatement: Statement<InsertableType[]>;
  private readonly columnsArray: ValueOf<Schema['columns']>[];
  private readonly columnNamesToInsertPlaces: Map<string, number>;
  private readonly cachedRows: (() => InsertParameters<Schema>)[] = [];

  constructor(private readonly table: Table<Schema>) {
    this.columnsArray = this.createColumnsArray();
    this.columnNamesToInsertPlaces = this.createColumnNamesToInsertPlaces();
    this.insertStatement = this.createInsertStatement();
  }

  insert(...rows: InsertParameters<Schema>): number[] {
    this.batchInsert(() => rows);
    return this.flushBatchInsert();
  }

  batchInsert(
    rows: () => InsertParameters<Schema>,
    commitAfterBatchSize?: number
  ): number[] {
    this.cachedRows.push(rows);
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
      for (const row of this.cachedRows.flatMap((cachedRow) => cachedRow())) {
        const insertArgs: InsertableType[] = this.columnsArray.map((_) => null);
        for (const datapoint of row) {
          insertArgs[this.insertPlace(datapoint.column)] = datapoint.value;
        }
        insertedRowIds.push(
          +this.insertStatement.run(...insertArgs).lastInsertRowid
        );
      }
    })();
    this.cachedRows.length = 0;
    return insertedRowIds;
  }

  private insertPlace(column: Column): number {
    const insertPlace = this.columnNamesToInsertPlaces.get(column.name);
    if (insertPlace === undefined) {
      if (
        Object.values(this.table.schema.columns).find(
          (_column) => _column.name === column.name
        )
      ) {
        throw new Error(
          `The column ${column.name} in the table ${this.table} cannot be manually inserted as it is autoincremented.`
        );
      } else {
        throw new Error(
          `The table ${this.table} does not have a ${column.name} column.`
        );
      }
    }
    return insertPlace;
  }

  private createColumnsArray(): ValueOf<Schema['columns']>[] {
    return Object.values(this.table.schema.columns).filter(
      (column) => !column.autoIncrement
    ) as ValueOf<Schema['columns']>[];
  }

  private createColumnNamesToInsertPlaces(): Map<string, number> {
    const columnNamesToInsertPlaces = new Map<string, number>();
    this.columnsArray.forEach((column, index) =>
      columnNamesToInsertPlaces.set(column.name, index)
    );
    return columnNamesToInsertPlaces;
  }

  private createInsertStatement(): Statement<InsertableType[]> {
    return databaseBackend().prepare<InsertableType[]>(`
          INSERT OR REPLACE INTO ${this.table}
                 (${this.columnsToString((column) => '"' + column.name + '"')})
          VALUES (${this.columnsToString(() => '?')})`);
  }

  private columnsToString(mapper: (column: Column) => string) {
    return Object.values(this.columnsArray).map(mapper).join(',');
  }
}

import { LazyProperty } from '../../tools/lazyProperty';
import { databaseBackend } from '../setup/backend';
import type { TableSchema } from '../tools/types';
import type { Table } from './table';

export class TableCounter<Schema extends TableSchema> {
  protected countQuery = new LazyProperty(() =>
    databaseBackend().prepare(`
        SELECT COUNT(*) as count
        FROM ${this.table}
  `)
  );

  constructor(protected readonly table: Table<Schema>) {}

  count(): number {
    return this.countQuery.value.get()?.count ?? 0;
  }
}

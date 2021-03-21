import { LazyProperty } from '../../tools/lazyProperty';
import { databaseBackend } from '../setup/backend';
import type { Column, TableSchema } from '../tools/types';
import type { Table } from './table';

export class TableMeta<Schema extends TableSchema> {
  protected existsQuery = new LazyProperty(() =>
    databaseBackend().prepare(`
        SELECT COUNT(*) AS count
        FROM "${this.table.schema.schema}".sqlite_schema
        WHERE type='table' AND name = ?
  `)
  );

  constructor(protected readonly table: Table<Schema>) {}

  exists(): boolean {
    return this.existsQuery.value.get(this.table.schema.name).count > 0;
  }

  loadSchemaFromDatabase(): Schema {
    if (!this.exists()) {
      throw new Error(`The table ${this.table} does not exist`);
    }
    const schema = {
      ...this.table.schema,
      columns: {},
    } as Schema;
    const columns: {
      name: Column['name'];
      type: Column['dataType'];
      notnull: number;
      pk: number;
    }[] = databaseBackend().pragma(
      `"${this.table.schema.schema}".table_info("${this.table.schema.name}")`
    );
    const isAutoIncrement = this.isAutoIncrement();
    for (const { name, type, notnull, pk } of columns) {
      schema.columns[name] = {
        dataType: type,
        name: name,
        notNull: notnull > 0,
        primaryKey: pk > 0,
        autoIncrement: pk > 0 && isAutoIncrement,
      };
    }
    return schema;
  }

  protected isAutoIncrement(): boolean {
    try {
      return (
        databaseBackend()
          .prepare(
            `SELECT COUNT(*) as count 
               FROM "${this.table.schema.schema}".sqlite_sequence
              WHERE name = ?`
          )
          .get(this.table.schema.name).count > 0
      );
    } catch (_) {
      return false;
    }
  }
}

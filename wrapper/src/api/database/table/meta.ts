import { LazyProperty } from '../../tools/lazyProperty';
import { Writeable } from '../../tools/types';
import { databaseBackend } from '../setup/backend';
import type { Column, TableSchema } from '../tools/types';
import type { Table } from './table';

export class TableMeta<Schema extends TableSchema> {
  protected existsQuery = new LazyProperty(() =>
    databaseBackend().prepare(`
        SELECT COUNT(*) AS count
        FROM ${this.table.schema.schema}.sqlite_schema
        WHERE type='table' AND name='${this.table.schema.name}'
  `)
  );

  constructor(protected readonly table: Table<Schema>) {}

  exists(): boolean {
    return this.existsQuery.value.get().count > 0;
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
    for (const { name, type, notnull, pk } of columns) {
      schema.columns[name] = {
        dataType: type,
        name: name,
        notNull: notnull > 0,
        primaryKey: pk > 0,
      };
    }
    const primaryKeys = Object.values(schema.columns).filter(
      (column) => column.primaryKey
    );
    if (primaryKeys.length === 1 && primaryKeys[0].dataType === 'INTEGER') {
      (primaryKeys[0] as Writeable<Column>).autoIncrement = true;
    }
    return schema;
  }
}

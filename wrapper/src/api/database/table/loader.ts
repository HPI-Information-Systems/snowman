import { Writeable } from '../../tools/types';
import { databaseBackend } from '../setup/backend';
import { Column, TableSchema } from '../tools/types';
import { Table } from './table';

export function tableExists({
  name,
  schema,
}: {
  name: TableSchema['name'];
  schema: TableSchema['schema'];
}): boolean {
  return (
    databaseBackend()
      .prepare(
        `SELECT COUNT(*) AS count
    FROM ${schema}.sqlite_schema
    WHERE type='table' AND name='${name}'`
      )
      .get().count > 0
  );
}

export function throwIfTableNotExists({
  name,
  schema,
}: {
  name: TableSchema['name'];
  schema: TableSchema['schema'];
}): void {
  if (!tableExists({ name, schema })) {
    throw new Error(`The table ${schema}.${name} does not exist`);
  }
}

export function loadTableFromDatabase<
  T extends TableSchema = TableSchema
>(table: {
  name: TableSchema['name'];
  schema: TableSchema['schema'];
}): Table<T> {
  throwIfTableNotExists(table);
  const schema = {
    name: table.name,
    schema: table.schema,
    columns: {},
  } as T;
  const columns: {
    name: Column['name'];
    type: Column['dataType'];
    notnull: number;
    pk: number;
  }[] = databaseBackend().pragma(
    `"${table.schema}".table_info("${table.name}")`
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
  return new Table(schema);
}

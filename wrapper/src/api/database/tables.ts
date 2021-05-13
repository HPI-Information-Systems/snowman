import { ValueOf } from 'snowman-library';

import { tableSchemas } from './schemas';
import { databaseBackendSubject } from './setup/backend';
import { Table } from './table';
import { Schemas, TableSchema } from './tools/types';

type SchemaT<RawSchemaT> = {
  [tableKey in keyof RawSchemaT]: RawSchemaT[tableKey] extends (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) => TableSchema
    ? (
        ...args: Parameters<RawSchemaT[tableKey]>
      ) => Table<
        ReturnType<RawSchemaT[tableKey]> extends TableSchema
          ? ReturnType<RawSchemaT[tableKey]>
          : TableSchema
      >
    : Table<
        RawSchemaT[tableKey] extends TableSchema
          ? RawSchemaT[tableKey]
          : TableSchema
      >;
};
type TablesType = {
  [schemaKey in keyof typeof tableSchemas]: SchemaT<
    typeof tableSchemas[schemaKey]
  >;
};

function schemaToTables<RawSchemaT extends ValueOf<Schemas>>(
  schema: RawSchemaT
): SchemaT<RawSchemaT> {
  return Object.fromEntries(
    Object.entries(schema).map(([key, table]) => [
      key,
      typeof table === 'function'
        ? (...args: Parameters<typeof table>) => {
            const _table = new Table(table(...args));
            try {
              _table.loadSchemaFromDatabase();
            } finally {
              // eslint-disable-next-line no-unsafe-finally
              return _table;
            }
          }
        : new Table(table as TableSchema),
    ])
  ) as SchemaT<RawSchemaT>;
}

export const tables = {} as TablesType;
function createTables() {
  Object.assign(
    tables,
    Object.fromEntries(
      Object.entries(tableSchemas).map(([key, schema]) => [
        key,
        schemaToTables(schema),
      ])
    )
  );
}

databaseBackendSubject.subscribe(createTables);

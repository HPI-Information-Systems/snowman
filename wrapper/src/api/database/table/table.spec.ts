import { assertType } from '../../tools/types';
import { attachDatabases } from '../setup';
import { databaseBackend, loadOrCreateMainDatabase } from '../setup/backend';
import { installTables } from '../setup/install';
import { TableSchema } from '../tools/types';
import { loadTableFromDatabase, throwIfTableNotExists } from './loader';
import { Table } from './table';

describe('Table', () => {
  const schema = 'meta';
  const mountedTable = assertType<TableSchema>()({
    schema: schema,
    name: 'mountedTable' as const,
    columns: {
      id: {
        name: 'id' as const,
        dataType: 'INTEGER' as const,
        primaryKey: true as const,
        autoIncrement: true as const,
        notNull: true as const,
      },
      nonnull: {
        name: 'nonnull' as const,
        dataType: 'TEXT' as const,
        notNull: true as const,
      },
      canbenull: {
        name: 'canbenull' as const,
        dataType: 'TEXT' as const,
      },
    },
  });
  const notMountedTable = 'notMountedTable';
  beforeEach(() => {
    loadOrCreateMainDatabase(true);
    attachDatabases([schema], true);
    installTables([mountedTable]);
  });

  test('loadTableFromDatabase returns correct columns', () => {
    expect(loadTableFromDatabase(mountedTable).schema).toMatchObject(
      mountedTable
    );
  });

  test('loadTableFromDatabase throws error if table not existent', () => {
    expect(() =>
      loadTableFromDatabase({
        name: notMountedTable,
        schema: schema,
      })
    ).toThrow();
  });

  test('delete deletes table', () => {
    expect(() => throwIfTableNotExists(mountedTable)).not.toThrow();
    new Table(mountedTable).delete();
    expect(() => throwIfTableNotExists(mountedTable)).toThrow();
  });

  test('inserter inserts rows', () => {
    const table = new Table(mountedTable);
    const nonnull1 = 'sdfsdfsd';
    const nonnull2 = 'sssss';
    const canbenull2 = 'gggg';
    function getInsertedValues(): Set<{ nonnull: string; canbenull: string }> {
      return new Set(
        databaseBackend()
          .prepare(
            `SELECT "${mountedTable.columns.nonnull.name}" as nonnull, "${mountedTable.columns.canbenull.name}" as canbenull
             FROM ${table}`
          )
          .all()
      );
    }

    expect(getInsertedValues().size).toBe(0);

    table.insert([
      {
        column: table.schema.columns.nonnull,
        value: nonnull1,
      },
    ]);
    expect(getInsertedValues()).toMatchObject(
      new Set([
        {
          nonnull: nonnull1,
          canbenull: null,
        },
      ])
    );

    table.insert([
      {
        column: table.schema.columns.nonnull,
        value: nonnull2,
      },
      {
        column: table.schema.columns.canbenull,
        value: canbenull2,
      },
    ]);
    expect(getInsertedValues()).toMatchObject(
      new Set([
        {
          nonnull: nonnull1,
          canbenull: null,
        },
        {
          nonnull: nonnull2,
          canbenull: canbenull2,
        },
      ])
    );
  });
});

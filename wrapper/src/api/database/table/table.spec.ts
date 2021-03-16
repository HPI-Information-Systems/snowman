import { assertType } from '../../tools/types';
import { attachDatabases } from '../setup';
import { loadOrCreateMainDatabase } from '../setup/backend';
import { installTables } from '../setup/install';
import { TableSchema } from '../tools/types';
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

  test('loadSchemaFromDatabase returns correct columns', () => {
    const table = new Table(mountedTable);
    table.loadSchemaFromDatabase();
    expect(table.schema).toMatchObject(mountedTable);
  });

  test('loadSchemaFromDatabase throws error if table not existent', () => {
    expect(() =>
      new Table({
        name: notMountedTable,
        schema: schema,
        columns: {},
      }).loadSchemaFromDatabase()
    ).toThrow();
  });

  test('delete deletes table', () => {
    expect(new Table(mountedTable).exists()).toBe(true);
    new Table(mountedTable).dropTable();
    expect(new Table(mountedTable).exists()).toBe(false);
  });

  test('inserter inserts rows', () => {
    const table = new Table(mountedTable);
    const nonnull1 = 'sdfsdfsd';
    const nonnull2 = 'sssss';
    const canbenull2 = 'gggg';
    expect(table.all().length).toBe(0);

    const [id] = table.upsert([
      {
        nonnull: nonnull1,
      },
    ]);
    expect(new Set(table.all())).toMatchObject(
      new Set([
        {
          nonnull: nonnull1,
          canbenull: null,
          id,
        },
      ])
    );

    const [id2] = table.upsert([
      {
        nonnull: nonnull2,
        canbenull: canbenull2,
      },
    ]);
    expect(new Set(table.all())).toMatchObject(
      new Set([
        {
          nonnull: nonnull1,
          canbenull: null,
          id,
        },
        {
          nonnull: nonnull2,
          canbenull: canbenull2,
          id: id2,
        },
      ])
    );
  });

  test('getter gets rows', () => {
    const table = new Table(mountedTable);
    const nonnull1 = 'sdfsdfsd';
    const nonnull2 = 'sssss';
    const canbenull2 = 'gggg';
    expect(table.all().length).toBe(0);
    expect(table.get()).toBe(undefined);
    const [id] = table.upsert([
      {
        nonnull: nonnull1,
      },
    ]);
    expect(new Set(table.all())).toMatchObject(
      new Set([
        {
          nonnull: nonnull1,
          canbenull: null,
          id,
        },
      ])
    );
    expect(table.get()).toMatchObject({
      nonnull: nonnull1,
      canbenull: null,
      id,
    });
    expect(
      table.get({
        nonnull: 'not' + nonnull1,
      })
    ).toBe(undefined);
    expect(
      table.all({
        nonnull: 'not' + nonnull1,
      }).length
    ).toBe(0);

    const [id2] = table.upsert([
      {
        nonnull: nonnull2,
        canbenull: canbenull2,
      },
    ]);
    expect(new Set(table.all())).toMatchObject(
      new Set([
        {
          nonnull: nonnull1,
          canbenull: null,
          id,
        },
        {
          nonnull: nonnull2,
          canbenull: canbenull2,
          id: id2,
        },
      ])
    );
    expect(new Set(table.all({ id }))).toMatchObject(
      new Set([
        {
          nonnull: nonnull1,
          canbenull: null,
          id,
        },
      ])
    );
    expect(table.get({ id: id2 })).toMatchObject({
      nonnull: nonnull2,
      canbenull: canbenull2,
      id: id2,
    });
  });

  test('deleter deletes rows', () => {
    const table = new Table(mountedTable);
    const nonnull1 = 'sdfsdfsd';
    const nonnull2 = 'sssss';
    const canbenull2 = 'gggg';
    expect(table.all().length).toBe(0);
    const [id] = table.upsert([
      {
        nonnull: nonnull1,
      },
    ]);
    expect(new Set(table.all())).toMatchObject(
      new Set([
        {
          nonnull: nonnull1,
          canbenull: null,
          id,
        },
      ])
    );

    const [id2] = table.upsert([
      {
        nonnull: nonnull2,
        canbenull: canbenull2,
      },
    ]);
    expect(new Set(table.all())).toMatchObject(
      new Set([
        {
          nonnull: nonnull1,
          canbenull: null,
          id,
        },
        {
          nonnull: nonnull2,
          canbenull: canbenull2,
          id: id2,
        },
      ])
    );
    table.delete({
      id: id2,
    });
    expect(new Set(table.all())).toMatchObject(
      new Set([
        {
          nonnull: nonnull1,
          canbenull: null,
          id,
        },
      ])
    );

    table.delete({
      id: id2,
    });
    expect(new Set(table.all())).toMatchObject(
      new Set([
        {
          nonnull: nonnull1,
          canbenull: null,
          id,
        },
      ])
    );

    table.delete({
      nonnull: nonnull1,
    });
    expect(table.all().length).toBe(0);
  });
});

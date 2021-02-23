import { assertType } from '../tools/types';
import { attachDatabases } from './setup';
import { databaseBackend, loadOrCreateMainDatabase } from './setup/backend';
import { installTables } from './setup/install';
import { throwIfTableNotExists } from './table/loader';
import { ForeignKeys, TableSchema } from './tools/types';

describe('Database', () => {
  beforeEach(() => {
    loadOrCreateMainDatabase(true);
  });
  test('databases attached', () => {
    const attachedDatabase = 'meta';
    attachDatabases([attachedDatabase], true);
    const databases = databaseBackend().pragma('database_list') as {
      seq: number;
      name: string;
      file: string;
    }[];
    expect(databases.map(({ name }) => name)).toContain(attachedDatabase);
  });

  test('tables created in correct order', () => {
    const schema = 'meta';
    attachDatabases([schema], true);

    const dependency = assertType<TableSchema>()({
      schema: schema,
      name: 'dependency' as const,
      columns: {
        dependency: {
          name: 'dependency' as const,
          dataType: 'INTEGER',
          primaryKey: true,
          autoIncrement: true,
          notNull: true,
        },
      },
    });
    const dependent = assertType<TableSchema>()({
      schema: schema,
      name: 'dependent' as const,
      columns: {
        tableID: {
          name: 'tableID' as const,
          dataType: 'INTEGER',
          notNull: true,
          foreignKeys: (() => [
            {
              table: dependency,
              column: dependency.columns.dependency,
            },
          ]) as undefined | (() => ForeignKeys),
        },
      },
    });
    installTables([dependent, dependency]);

    expect(() => throwIfTableNotExists(dependency)).not.toThrow();
    expect(() => throwIfTableNotExists(dependent)).not.toThrow();
  });

  test('throwIfTableNotExists throws if table not exists', () => {
    const attachedDatabase = 'meta';
    attachDatabases([attachedDatabase], true);
    expect(() =>
      throwIfTableNotExists({
        name: 'notExists',
        schema: 'meta',
      })
    ).toThrow();
  });
});

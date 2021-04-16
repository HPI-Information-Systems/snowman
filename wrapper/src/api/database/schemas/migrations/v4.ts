import { assertType } from '../../../tools/types';
import { SetupOptions } from '../../setup';
import { databaseBackend } from '../../setup/backend';
import { installTables } from '../../setup/install';
import { Table } from '../../table';
import { ForeignKeys, TableSchema } from '../../tools/types';
import { tableSchemas } from '..';
import { SchemaVersion } from './schemaVersion';
import { SchemaV3 } from './v3';

const frozenSimilarityFunctionsSchema = assertType<
  TableSchema<'meta', 'similarityfunction'>
>()({
  name: 'similarityfunction',
  schema: 'meta',
  autoInstall: true,
  columns: {
    id: {
      name: 'id',
      dataType: 'INTEGER',
      autoIncrement: true,
      notNull: true,
      primaryKey: true,
    },
    experiment: {
      name: 'experiment',
      dataType: 'INTEGER',
      notNull: true,
      foreignKeys: (): ForeignKeys => [
        {
          table: tableSchemas.meta.experiment,
          column: tableSchemas.meta.experiment.columns.id,
        },
      ],
    },
    expression: {
      name: 'expression',
      dataType: 'TEXT',
      notNull: true,
    },
  },
});

export class SchemaV4 extends SchemaVersion {
  readonly predecessor = new SchemaV3();

  protected async migrateFromLastVersion(options: SetupOptions): Promise<void> {
    new Table(frozenSimilarityFunctionsSchema).create(true, true);
  }
}

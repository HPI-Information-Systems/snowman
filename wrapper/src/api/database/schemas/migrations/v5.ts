import { assertType } from '../../../tools/types';
import { SetupOptions } from '../../setup';
import { Table } from '../../table';
import { Columns, TableSchema } from '../../tools/types';
import { SchemaVersion } from './schemaVersion';
import { SchemaV4 } from './v4';

const frozenColumns = assertType<Columns>()({
  key: {
    name: 'key' as const,
    notNull: true,
    dataType: 'TEXT',
  },
  value: {
    name: 'value' as const,
    notNull: true,
    dataType: 'INTEGER',
  },
});

const frozenIntersectionCountsSchema = assertType<
  TableSchema<'cache', 'intersectionCounts', ['key', 'value']>
>()({
  name: 'intersectionCounts',
  schema: 'cache',
  autoInstall: true,
  columns: frozenColumns,
  indices: [[frozenColumns.key]],
});

export class SchemaV5 extends SchemaVersion {
  readonly predecessor = new SchemaV4();

  protected async migrateFromLastVersion(options: SetupOptions): Promise<void> {
    new Table(frozenIntersectionCountsSchema).create(true, true);
  }
}

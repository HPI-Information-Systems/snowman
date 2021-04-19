import { providers } from '../../../providers';
import { UnionFind } from '../../../providers/benchmark/cluster/unionFind';
import { DatasetIDMapper } from '../../../providers/dataset/util/idMapper';
import { assertType } from '../../../tools/types';
import { SetupOptions } from '../../setup';
import { databaseBackend } from '../../setup/backend';
import { Table } from '../../table';
import { tables } from '../../tables';
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
    databaseBackend().transaction(() => {
      new Table(frozenIntersectionCountsSchema).create(false, true);

      for (const { id, datasetId } of providers.experiment.listExperiments()) {
        const fileTable = tables.experiment.experiment(id);
        if (fileTable.exists()) {
          databaseBackend().exec(`
            ALTER TABLE ${fileTable} 
             ADD COLUMN isDuplicateAndLinksUnlinkedNodes INTEGER DEFAULT 0
         `);
          const count = new DatasetIDMapper(datasetId).numberMappedIds();
          const unionFind = new UnionFind(count);
          for (const { id1, id2, ...rest } of fileTable.all({
            isDuplicate: 1,
          })) {
            if (!unionFind.nodesAreLinked(id1, id2)) {
              unionFind.link([[id1, id2]]);
              fileTable.upsert([
                {
                  ...rest,
                  id1,
                  id2,
                  isDuplicateAndLinksUnlinkedNodes: 1,
                },
              ]);
            }
          }
          databaseBackend().exec(
            `CREATE INDEX "experiment"."index_${fileTable.schema.name}_isDuplicateAndLinksUnlinkedNodes" 
                       ON "${fileTable.schema.name}" ("isDuplicateAndLinksUnlinkedNodes")`
          );
        }
      }
    })();
  }
}

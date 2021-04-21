import { providers } from '../../../providers';
import { UnionFind } from '../../../providers/benchmark/cluster/unionFind';
import { DatasetIDMapper } from '../../../providers/dataset/util/idMapper';
import { SetupOptions } from '../../setup';
import { databaseBackend } from '../../setup/backend';
import { tables } from '../../tables';
import { SchemaVersion } from './schemaVersion';
import { SchemaV4 } from './v4';

export class SchemaV5 extends SchemaVersion {
  readonly predecessor = new SchemaV4();

  protected async migrateFromLastVersion(options: SetupOptions): Promise<void> {
    databaseBackend().transaction(() => {
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

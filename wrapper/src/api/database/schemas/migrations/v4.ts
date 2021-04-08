import { tables } from '../../';
import { SetupOptions } from '../../setup';
import { databaseBackend } from '../../setup/backend';
import { SchemaVersion } from './schemaVersion';
import { SchemaV3 } from './v3';

export class SchemaV4 extends SchemaVersion {
  readonly predecessor = new SchemaV3();

  protected async migrateFromLastVersion(options: SetupOptions): Promise<void> {
    databaseBackend().exec(
      `ALTER TABLE ${tables.meta.experiment.schema.name}
           ADD COLUMN
               timeToConfigure INTEGER`
    );
  }
}

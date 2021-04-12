import { tables } from '../../';
import { SetupOptions } from '../../setup';
import { databaseBackend } from '../../setup/backend';
import { SchemaVersion } from './schemaVersion';
import { SchemaV4 } from './v4';

export class SchemaV5 extends SchemaVersion {
  readonly predecessor = new SchemaV4();

  protected async migrateFromLastVersion(options: SetupOptions): Promise<void> {
    databaseBackend().exec(
      `ALTER TABLE ${tables.meta.experiment.schema.name}
           ADD COLUMN
               timeToConfigure INTEGER`
    );
  }
}

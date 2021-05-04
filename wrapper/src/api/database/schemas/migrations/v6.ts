import { tables } from '../../';
import { SetupOptions } from '../../setup';
import { databaseBackend } from '../../setup/backend';
import { SchemaVersion } from './schemaVersion';
import { SchemaV5 } from './v5';

export class SchemaV6 extends SchemaVersion {
  readonly predecessor = new SchemaV5();

  protected async migrateFromLastVersion(options: SetupOptions): Promise<void> {
    databaseBackend().exec(
      `ALTER TABLE ${tables.meta.similarityfunction.schema.name}
           ADD COLUMN
              name TEXT`
    );
  }
}

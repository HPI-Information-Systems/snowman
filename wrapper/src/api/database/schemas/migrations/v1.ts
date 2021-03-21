import { SetupOptions } from '../../setup';
import { SchemaVersion } from './schemaVersion';
import { SchemaV0 } from './v0';

export class SchemaV1 extends SchemaVersion {
  readonly predecessor = new SchemaV0();

  readonly performResetAsMigration = true;

  protected async migrateFromLastVersion(options: SetupOptions): Promise<void> {
    throw new Error(
      'Cannot migrate to database schema version v1 as it has breaking changes which cannot be migrated.'
    );
  }
}

import { SetupOptions } from '../../setup';
import { SchemaVersion } from './schemaVersion';

export class SchemaV0 extends SchemaVersion {
  readonly predecessor = undefined;

  protected async migrateFromLastVersion(
    setupOptions: SetupOptions
  ): Promise<void> {
    throw new Error(
      'Cannot migrate to database schema version v0 as this is the first schema version.'
    );
  }
}

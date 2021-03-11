import { SchemaVersion } from './schemaVersion';

export class SchemaV0 extends SchemaVersion {
  readonly predecessor = undefined;

  protected async migrateFromLastVersion(): Promise<void> {
    throw new Error(
      'Cannot migrate to database schema version v1 as this is the first schema version.'
    );
  }
}

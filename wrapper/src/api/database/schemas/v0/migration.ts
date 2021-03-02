import { SchemaVersion } from '../schemaVersion';

export class SchemaV0 extends SchemaVersion {
  readonly version = 0;
  readonly predecessor?: SchemaVersion | undefined = undefined;

  protected migrateFromLastVersion(): void {
    throw new Error(
      'Cannot migrate to database schema version v1 as this is the first schema version.'
    );
  }
}

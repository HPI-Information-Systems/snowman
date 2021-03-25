import { tables } from '../../';
import { SetupOptions } from '../../setup';
import { databaseBackend } from '../../setup/backend';
import { SchemaVersion } from './schemaVersion';
import { SchemaV2 } from './v2';

export class SchemaV3 extends SchemaVersion {
  readonly predecessor = new SchemaV2();

  protected async migrateFromLastVersion(options: SetupOptions): Promise<void> {
    databaseBackend().exec(
      `ALTER TABLE ${tables.meta.experiment.schema.name}
         ADD COLUMN
             timeToConfigure INTEGER`
    );
    databaseBackend().exec(
      `ALTER TABLE ${tables.meta.algorithm.schema.name}
         ADD COLUMN
             implementationKnowHowLevel TEXT`
    );
    databaseBackend().exec(
      `ALTER TABLE ${tables.meta.algorithm.schema.name}
         ADD COLUMN
             matchingSolutionType TEXT`
    );
    databaseBackend().exec(
      `ALTER TABLE ${tables.meta.algorithm.schema.name}
         ADD COLUMN
             timeToInstall INTEGER`
    );
    databaseBackend().exec(
      `ALTER TABLE ${tables.meta.algorithm.schema.name}
         ADD COLUMN
             timeToConfigure INTEGER`
    );
  }
}

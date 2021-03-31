import { tables } from '../../';
import { SetupOptions } from '../../setup';
import { databaseBackend } from '../../setup/backend';
import { SchemaVersion } from './schemaVersion';
import { SchemaV3 } from './v3';

export class SchemaV4 extends SchemaVersion {
  readonly predecessor = new SchemaV3();

  protected async migrateFromLastVersion(options: SetupOptions): Promise<void> {
    databaseBackend().exec(
      `ALTER TABLE ${tables.meta.algorithm.schema.name}
         RENAME COLUMN 
            timeToConfigure TO deprecated1`
    );
    databaseBackend().exec(
      `ALTER TABLE ${tables.meta.algorithm.schema.name}
         ADD COLUMN
            useCase TEXT`
    );
    databaseBackend().exec(
      `ALTER TABLE ${tables.meta.algorithm.schema.name}
         ADD COLUMN
            inputFormat TEXT`
    );
    databaseBackend().exec(
      `ALTER TABLE ${tables.meta.algorithm.schema.name}
         ADD COLUMN
            interface TEXT`
    );
    databaseBackend().exec(
      `ALTER TABLE ${tables.meta.algorithm.schema.name}
           ADD COLUMN
            costs INTEGER`
    );
    databaseBackend().exec(
      `ALTER TABLE ${tables.meta.algorithm.schema.name}
           ADD COLUMN
            os TEXT`
    );
    databaseBackend().exec(
      `ALTER TABLE ${tables.meta.experiment.schema.name}
         ADD COLUMN
            implementationKnowHowLevel TEXT`
    );
  }
}

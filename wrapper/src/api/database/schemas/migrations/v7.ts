import { tables } from '../../';
import { SetupOptions } from '../../setup';
import { databaseBackend } from '../../setup/backend';
import { SchemaVersion } from './schemaVersion';
import { SchemaV6 } from './v6';

export class SchemaV7 extends SchemaVersion {
  readonly predecessor = new SchemaV6();

  protected async migrateFromLastVersion(options: SetupOptions): Promise<void> {
    databaseBackend().exec(
      `ALTER TABLE ${tables.meta.experiment.schema.name}
           ADD COLUMN
              hrAmount INTEGER`
    );
    databaseBackend().exec(
      `ALTER TABLE ${tables.meta.experiment.schema.name}
           ADD COLUMN
               expertise INTEGER`
    );
    databaseBackend().exec(
      `ALTER TABLE ${tables.meta.algorithm.schema.name}
           ADD COLUMN
              installationExpertise INTEGER`
    );

    databaseBackend().exec(
      `ALTER TABLE ${tables.meta.algorithm.schema.name}
           ADD COLUMN
              installationHrAmount INTEGER`
    );

    databaseBackend().exec(
      `ALTER TABLE ${tables.meta.algorithm.schema.name}
           ADD COLUMN
              generalCosts INTEGER`
    );
    databaseBackend().exec(
      `ALTER TABLE ${tables.meta.algorithm.schema.name}
           ADD COLUMN
              matchingSolutionExpertise INTEGER`
    );
    databaseBackend().exec(
      `ALTER TABLE ${tables.meta.algorithm.schema.name}
           ADD COLUMN
              matchingSolutionHrAmount INTEGER`
    );
    databaseBackend().exec(
      `ALTER TABLE ${tables.meta.algorithm.schema.name}
           ADD COLUMN
              domainExpertise INTEGER`
    );
    databaseBackend().exec(
      `ALTER TABLE ${tables.meta.algorithm.schema.name}
           ADD COLUMN
              domainHrAmount INTEGER`
    );
    databaseBackend().exec(
      `ALTER TABLE ${tables.meta.algorithm.schema.name}
           ADD COLUMN
              interfaces TEXT`
    );
    databaseBackend().exec(
      `ALTER TABLE ${tables.meta.algorithm.schema.name}
           ADD COLUMN
              supportedOSs TEXT`
    );
    databaseBackend().exec(
      `ALTER TABLE ${tables.meta.algorithm.schema.name}
           ADD COLUMN
              deploymentType TEXT`
    );
    databaseBackend().exec(
      `ALTER TABLE ${tables.meta.algorithm.schema.name}
           ADD COLUMN
              solutionType TEXT`
    );
    databaseBackend().exec(
      `ALTER TABLE ${tables.meta.algorithm.schema.name}
           ADD COLUMN
              useCase TEXT`
    );
  }
}

import { SetupOptions } from '../../setup';
import {
  exampleDatasets,
  exampleExperiments,
  loadExampleDatasets,
  loadExampleExperiments,
} from '../../setup/examples';
import { SchemaVersion } from './schemaVersion';
import { SchemaV2 } from './v2';

export class SchemaV3 extends SchemaVersion {
  readonly predecessor = new SchemaV2();

  protected async migrateFromLastVersion(options: SetupOptions): Promise<void> {
    if (options.loadExampleEntries) {
      const { notebookLarge, altoSight } = exampleDatasets;
      await loadExampleDatasets({ notebookLarge, altoSight });
      const {
        notebookLargeSigmodGoldstandard,
        altoSightSigmodGoldstandard,
      } = exampleExperiments;
      await loadExampleExperiments({
        notebookLargeSigmodGoldstandard,
        altoSightSigmodGoldstandard,
      });
    }
  }
}

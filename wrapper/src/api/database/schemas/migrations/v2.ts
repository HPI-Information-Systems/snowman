import { SetupOptions } from '../../setup';
import {
  exampleDatasets,
  exampleExperiments,
  loadExampleDatasets,
  loadExampleExperiments,
} from '../../setup/examples';
import { SchemaVersion } from './schemaVersion';
import { SchemaV1 } from './v1';

export class SchemaV2 extends SchemaVersion {
  readonly predecessor = new SchemaV1();

  protected async migrateFromLastVersion(options: SetupOptions): Promise<void> {
    if (options.loadExampleEntries) {
      const { freedbCds, cora } = exampleDatasets;
      await loadExampleDatasets({ freedbCds, cora });
      const {
        freedbCdsGoldstandard,
        freedbCdsExampleRun,
        hpiCoraGoldstandard,
        hpiCoraExampleRun,
      } = exampleExperiments;
      await loadExampleExperiments({
        freedbCdsGoldstandard,
        freedbCdsExampleRun,
        hpiCoraGoldstandard,
        hpiCoraExampleRun,
      });
    }
  }
}

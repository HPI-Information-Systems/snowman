import { databaseBackend, tables } from '../../database';
import { providers } from '..';
import { DatasetIDMapper } from './util/idMapper';

export class DatasetDeleter {
  constructor(private readonly datasetId: number) {}

  delete(): void {
    databaseBackend().transaction(() => {
      this.deleteExperimentsUsingThisDataset();
      this.deleteFile();
      this.deleteIDMap();
      this.deleteMetaRecord();
    })();
  }

  deleteFile(): void {
    tables.dataset.dataset(this.datasetId).dropTable(false);
  }

  private deleteIDMap(): void {
    new DatasetIDMapper(this.datasetId).deleteAll();
  }

  private deleteMetaRecord(): void {
    tables.meta.dataset.delete({ id: this.datasetId });
  }

  private deleteExperimentsUsingThisDataset(): void {
    const experimentProvider = providers.experiment;
    for (const { id } of tables.meta.experiment.all({
      dataset: this.datasetId,
    })) {
      experimentProvider.deleteExperiment(id);
    }
  }
}

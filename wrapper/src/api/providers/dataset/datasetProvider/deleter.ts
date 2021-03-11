import { databaseBackend, Table } from '../../../database';
import { tableSchemas } from '../../../database/schemas';
import { getProviders } from '../..';
import { DatasetProviderQueries } from './queries';
import { DatasetIDMapper } from './util/idMapper';

export class DatasetDeleter {
  constructor(
    private readonly datasetId: number,
    private readonly queries: DatasetProviderQueries
  ) {}

  delete(): void {
    databaseBackend().transaction(() => {
      this.deleteExperimentsUsingThisDataset();
      this.deleteFile();
      this.deleteIDMap();
      this.deleteMetaRecord();
    })();
  }

  deleteFile(): void {
    new Table(tableSchemas.dataset.dataset(this.datasetId)).delete(false);
  }

  private deleteIDMap(): void {
    new DatasetIDMapper(this.datasetId).deleteAll();
  }

  private deleteMetaRecord(): void {
    this.queries.deleteDatasetQuery.run(this.datasetId);
  }

  private deleteExperimentsUsingThisDataset(): void {
    const experimentProvider = getProviders().experiment;
    for (const experimentId of this.queries.listExperimentsUsingThisDataset(
      this.datasetId
    )) {
      experimentProvider.deleteExperiment(experimentId);
    }
  }
}

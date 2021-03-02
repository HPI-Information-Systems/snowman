import { databaseBackend, Table } from '../../../database';
import { latest } from '../../../database/schemas';
import { ExperimentId } from '../../../server/types';
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
    new Table(latest.tableSchemas.dataset.dataset(this.datasetId)).delete(
      false
    );
  }

  private deleteIDMap(): void {
    new DatasetIDMapper(this.datasetId).deleteAll();
  }

  private deleteMetaRecord(): void {
    this.queries.deleteDatasetQuery.run(this.datasetId);
  }

  private deleteExperimentsUsingThisDataset(): void {
    const experimentProvider = getProviders().experiment;
    for (const experimentId of this.listExperimentsUsingThisDataset()) {
      experimentProvider.deleteExperiment(experimentId);
    }
  }

  private listExperimentsUsingThisDataset(): ExperimentId[] {
    return this.queries.listExperimentsUsingDatasetQuery
      .all(this.datasetId)
      .map(({ id }: { id: ExperimentId }) => id);
  }
}

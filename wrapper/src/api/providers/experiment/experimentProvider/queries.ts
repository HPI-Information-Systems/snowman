import { databaseBackend, Table } from '../../../database';
import { tableSchemas } from '../../../database/schemas';

export class ExperimentProviderQueries {
  readonly schema = tableSchemas.meta.experiment;
  readonly table = new Table(this.schema);

  readonly listExperimentsQuery = databaseBackend().prepare(
    `SELECT "${this.schema.columns.name.name}" as name,
              "${this.schema.columns.description.name}" as description,
              "${this.schema.columns.id.name}" as id,
              "${this.schema.columns.dataset.name}" as datasetId,
              "${this.schema.columns.algorithm.name}" as algorithmId,
              "${this.schema.columns.numberOfUploadedRecords.name}" as numberOfUploadedRecords
         FROM ${this.table}`
  );
  readonly getExperimentQuery = databaseBackend().prepare(
    `SELECT "${this.schema.columns.name.name}" as name,
              "${this.schema.columns.description.name}" as description,
              "${this.schema.columns.id.name}" as id,
              "${this.schema.columns.dataset.name}" as datasetId,
              "${this.schema.columns.algorithm.name}" as algorithmId,
              "${this.schema.columns.numberOfUploadedRecords.name}" as numberOfUploadedRecords
         FROM ${this.table}
        WHERE "${this.schema.columns.id.name}" = ?`
  );
  readonly setExperimentQuery = databaseBackend().prepare(
    `INSERT OR REPLACE INTO ${this.table}("${this.schema.columns.name.name}",
                                            "${this.schema.columns.description.name}",
                                            "${this.schema.columns.id.name}",
                                            "${this.schema.columns.dataset.name}",
                                            "${this.schema.columns.algorithm.name}",
                                            "${this.schema.columns.numberOfUploadedRecords.name}")
                                     VALUES(@name, @description, @id, @datasetId, @algorithmId, @numberOfUploadedRecords)`
  );
  readonly deleteExperimentQuery = databaseBackend().prepare(
    `DELETE FROM ${this.table}
      WHERE "${this.schema.columns.id.name}" = ?`
  );

  readonly datasetSchema = tableSchemas.meta.dataset;
  readonly datasetTable = new Table(this.datasetSchema);
  readonly updateDatasetNumberRecords = databaseBackend().prepare(
    `UPDATE ${this.datasetTable}
        SET "${this.datasetSchema.columns.numberOfRecords.name}" = @numberOfRecords
      WHERE "${this.datasetSchema.columns.id.name}" = @id`
  );
}

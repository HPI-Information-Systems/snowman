import { databaseBackend, Table } from '../../../database';
import { tableSchemas } from '../../../database/schemas';

export class DatasetProviderQueries {
  readonly schema = tableSchemas.meta.dataset;
  readonly table = new Table(this.schema);
  readonly listDatasetsQuery = databaseBackend().prepare(
    `SELECT "${this.schema.columns.name.name}" as name,
              "${this.schema.columns.description.name}" as description,
              "${this.schema.columns.id.name}" as id,
              "${this.schema.columns.numberOfRecords.name}" as numberOfRecords,
              "${this.schema.columns.tags.name}" as tags,
              "${this.schema.columns.numberOfUploadedRecords.name}" as numberOfUploadedRecords
         FROM ${this.table}`
  );
  readonly getDatasetQuery = databaseBackend().prepare(
    `SELECT "${this.schema.columns.name.name}" as name,
              "${this.schema.columns.description.name}" as description,
              "${this.schema.columns.id.name}" as id,
              "${this.schema.columns.numberOfRecords.name}" as numberOfRecords,
              "${this.schema.columns.tags.name}" as tags,
              "${this.schema.columns.numberOfUploadedRecords.name}" as numberOfUploadedRecords
         FROM ${this.table}
        WHERE "${this.schema.columns.id.name}" = ?`
  );
  readonly setDatasetQuery = databaseBackend().prepare(
    `INSERT OR REPLACE INTO ${this.table}("${this.schema.columns.name.name}",
                                          "${this.schema.columns.description.name}",
                                          "${this.schema.columns.id.name}",
                                          "${this.schema.columns.numberOfRecords.name}",
                                          "${this.schema.columns.tags.name}",
                                          "${this.schema.columns.numberOfUploadedRecords.name}")
                                     VALUES(@name, @description, @id, @numberOfRecords, @tags, @numberOfUploadedRecords)`
  );
  readonly deleteDatasetQuery = databaseBackend().prepare(
    `DELETE FROM ${this.table}
        WHERE "${this.schema.columns.id.name}" = ?`
  );

  private readonly experimentsTable = new Table(tableSchemas.meta.experiment);
  readonly listExperimentsUsingDatasetQuery = databaseBackend().prepare(`
    SELECT "${this.experimentsTable.schema.columns.id.name}" as id
      FROM ${this.experimentsTable}
     WHERE "${this.experimentsTable.schema.columns.dataset.name}" = ?
  `);
}

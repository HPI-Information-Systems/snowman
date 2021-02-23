import { Statement } from 'better-sqlite3';

import { databaseBackend, Table } from '../../../../database';
import { tableSchemas } from '../../../../database/schemas';

export class DatasetIDMapper {
  private readonly schema: ReturnType<
    typeof tableSchemas['dataset']['datasetIdMap']
  >;
  private readonly table: Table<DatasetIDMapper['schema']>;

  private readonly getMappingQuery: Statement<string>;
  private readonly getReversedMappingQuery: Statement<number>;
  private readonly numberMappedIdsQuery: Statement<[]>;
  private readonly createMappingQuery: Statement<[number | null, string]>;
  private firstMappingCreated = false;

  constructor(datasetId: number) {
    this.schema = tableSchemas.dataset.datasetIdMap(datasetId);
    this.table = new Table(this.schema);
    this.table.create(false);
    this.getMappingQuery = databaseBackend().prepare(`
        SELECT "${this.schema.columns.id.name}" as id 
          FROM ${this.table}
         WHERE "${this.schema.columns.unmappedId.name}" = ?
    `);
    this.getReversedMappingQuery = databaseBackend().prepare(`
        SELECT "${this.schema.columns.unmappedId.name}" as id 
          FROM ${this.table}
         WHERE "${this.schema.columns.id.name}" = ?
    `);
    this.numberMappedIdsQuery = databaseBackend().prepare(`
      SELECT COUNT(*) as count
        FROM ${this.table}
    `);
    this.createMappingQuery = databaseBackend().prepare(`
      INSERT INTO ${this.table}("${this.schema.columns.id.name}",
                                "${this.schema.columns.unmappedId.name}")
                         VALUES(?, ?)`);
  }

  private createMapping(unmappedId: string): number {
    let id: number | null = null;
    if (!this.firstMappingCreated) {
      this.firstMappingCreated = true;
      if (this.numberMappedIds() === 0) {
        id = 0;
      }
    }
    return +this.createMappingQuery.run(id, unmappedId).lastInsertRowid;
  }

  map(unmappedId: string): number {
    return (
      this.getMappingQuery.get(unmappedId)?.id ?? this.createMapping(unmappedId)
    );
  }

  mapReversed(mappedId: number): string | undefined {
    return this.getReversedMappingQuery.get(mappedId)?.id;
  }

  numberMappedIds(): number {
    return this.numberMappedIdsQuery.get().count;
  }

  deleteAll(): void {
    this.table.delete(false);
  }
}

import { Statement } from 'better-sqlite3';

import { databaseBackend, Table } from '../../../../../database';
import { tableSchemas } from '../../../../../database/schemas';
import { datasetCustomColumnPrefix } from '../../../../../database/schemas/dataset';
import { loadTableFromDatabase } from '../../../../../database/table/loader';
import { Column } from '../../../../../database/tools/types';
import { DatasetId, ExperimentIntersection } from '../../../../../server/types';
import { DatasetIDMapper } from '../../../../dataset/datasetProvider/util/idMapper';

type DatasetSchema = ReturnType<typeof tableSchemas['dataset']['dataset']>;

export function idClustersToRecordClustersWithTable(
  idClusters: number[][],
  schema: DatasetSchema,
  datasetId: DatasetId
): ExperimentIntersection {
  let result: ExperimentIntersection;
  databaseBackend().transaction(() => {
    result = new IdClustersToRecordClusters(
      idClusters,
      loadTableFromDatabase<DatasetSchema>(schema),
      new DatasetIDMapper(datasetId)
    ).run();
  })();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return result!;
}

class IdClustersToRecordClusters {
  protected readonly columns: readonly Column[];
  protected readonly getRecordByIdQuery: Statement<number>;

  constructor(
    protected readonly idClusters: number[][],
    protected readonly table: Table<DatasetSchema>,
    protected readonly idMapper: DatasetIDMapper
  ) {
    this.columns = Object.values(this.table.schema.columns).filter((column) =>
      column.name.startsWith(datasetCustomColumnPrefix)
    );
    this.getRecordByIdQuery = databaseBackend().prepare(`
      SELECT ${this.getColumnsString()}
        FROM ${this.table}
      WHERE ${this.table.schema.columns.id.name} = ?
    `);
  }

  run(): ExperimentIntersection {
    return {
      header: this.getHeader(),
      data: this.getRecordClusters(),
    };
  }

  protected getHeader() {
    return this.columns.map((column) =>
      column.name.substring(datasetCustomColumnPrefix.length)
    );
  }

  protected getRecordClusters(): ExperimentIntersection['data'] {
    return this.idClusters
      .flatMap((cluster) => [...cluster.map((id) => this.getRecord(id)), []])
      .slice(0, -1);
  }

  protected getRecord(id: number): string[] {
    return (
      this.getRecordByIdQuery.raw(true).get(id) ?? this.getNonExistingRecord(id)
    );
  }

  protected getNonExistingRecord(id: number): string[] {
    return this.columns.map((column) =>
      column.notNull
        ? this.idMapper.mapReversed(id) ?? '<unknown>'
        : '<unknown>'
    );
  }

  protected getColumnsString(): string {
    return this.columns.map((column) => `"${column.name}"`).join(',');
  }
}

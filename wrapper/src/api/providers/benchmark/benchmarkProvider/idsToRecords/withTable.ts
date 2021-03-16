import { databaseBackend, Table } from '../../../../database';
import {
  datasetCustomColumnPrefix,
  tableSchemas,
} from '../../../../database/schemas';
import { Column } from '../../../../database/tools/types';
import { DatasetId, FileResponse } from '../../../../server/types';
import { DatasetIDMapper } from '../../../dataset/datasetProvider/util/idMapper';
import { NodeID } from '../cluster/types';

type DatasetSchema = ReturnType<typeof tableSchemas['dataset']['dataset']>;

export function idClustersToRecordClustersWithTable(
  idClusters: (NodeID | undefined)[],
  table: Table<DatasetSchema>,
  datasetId: DatasetId
): FileResponse {
  let result: FileResponse;
  databaseBackend().transaction(() => {
    result = new IdClustersToRecordClusters(
      idClusters,
      table,
      new DatasetIDMapper(datasetId)
    ).run();
  })();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return result!;
}

class IdClustersToRecordClusters {
  protected readonly columns: readonly Column[];
  protected readonly columnNames: readonly string[];

  constructor(
    protected readonly idClusters: (NodeID | undefined)[],
    protected readonly table: Table<DatasetSchema>,
    protected readonly idMapper: DatasetIDMapper
  ) {
    this.columns = Object.values(this.table.schema.columns).filter((column) =>
      column.name.startsWith(datasetCustomColumnPrefix)
    );
    this.columnNames = this.columns.map((column) => column.name);
  }

  run(): FileResponse {
    return {
      header: this.getHeader(),
      data: this.getRecordClusters(),
    };
  }

  protected getHeader() {
    return this.columnNames.map((column) =>
      column.substring(datasetCustomColumnPrefix.length)
    );
  }

  protected getRecordClusters(): FileResponse['data'] {
    return this.idClusters.map((id) => (id ? this.getRecord(id) : []));
  }

  protected getRecord(id: number): string[] {
    return (this.table.get({ id }, this.columnNames, true) ??
      this.getNonExistingRecord(id)) as string[];
  }

  protected getNonExistingRecord(id: number): string[] {
    return this.columns.map((column) =>
      column.notNull
        ? this.idMapper.mapReversed(id) ?? '<unknown>'
        : '<unknown>'
    );
  }
}

import { tables } from '../../../database';
import { DatasetId, JSONFileResponse } from '../../../server/types';
import { NodeID } from '../cluster/types';
import { idClustersToRecordClustersNoTable } from './noTable';
import { idClustersToRecordClustersWithTable } from './withTable';

export function idClustersToRecordClusters(
  idClusters: (NodeID | undefined)[],
  datasetId: DatasetId
): JSONFileResponse {
  const table = tables.dataset.dataset(datasetId);
  if (table.exists()) {
    table.loadSchemaFromDatabase();
    return idClustersToRecordClustersWithTable(idClusters, table, datasetId);
  } else {
    return idClustersToRecordClustersNoTable(idClusters, datasetId);
  }
}

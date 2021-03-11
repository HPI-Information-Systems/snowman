import { tableSchemas } from '../../../../database/schemas';
import { tableExists } from '../../../../database/table/loader';
import { DatasetId, ExperimentIntersection } from '../../../../server/types';
import { NodeID } from '../cluster/types';
import { idClustersToRecordClustersNoTable } from './noTable';
import { idClustersToRecordClustersWithTable } from './withTable';

export function idClustersToRecordClusters(
  idClusters: (NodeID | undefined)[],
  datasetId: DatasetId
): ExperimentIntersection {
  const schema = tableSchemas.dataset.dataset(datasetId);
  if (tableExists(schema)) {
    return idClustersToRecordClustersWithTable(idClusters, schema, datasetId);
  } else {
    return idClustersToRecordClustersNoTable(idClusters, datasetId);
  }
}

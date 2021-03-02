import { latest } from '../../../../../database/schemas';
import { tableExists } from '../../../../../database/table/loader';
import { DatasetId, ExperimentIntersection } from '../../../../../server/types';
import { idClustersToRecordClustersNoTable } from './noTable';
import { idClustersToRecordClustersWithTable } from './withTable';

export function idClustersToRecordClusters(
  idClusters: number[][],
  datasetId: DatasetId
): ExperimentIntersection {
  const schema = latest.tableSchemas.dataset.dataset(datasetId);
  if (tableExists(schema)) {
    return idClustersToRecordClustersWithTable(idClusters, schema, datasetId);
  } else {
    return idClustersToRecordClustersNoTable(idClusters);
  }
}

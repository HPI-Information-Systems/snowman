import { DatasetId, JSONFileResponse } from '../../../server/types';
import { DatasetIDMapper } from '../../dataset/util/idMapper';
import { NodeID } from '../cluster/types';

export function idClustersToRecordClustersNoTable(
  idClusters: (NodeID | undefined)[],
  datasetId: DatasetId
): JSONFileResponse {
  const idMapper = new DatasetIDMapper(datasetId);
  return {
    header: ['id'],
    data: idClusters.map((id) =>
      id ? [idMapper.mapReversed(id) ?? 'unknown'] : []
    ),
  };
}

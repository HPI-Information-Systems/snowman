import { DatasetId, ExperimentIntersection } from '../../../../../server/types';
import { DatasetIDMapper } from '../../../../dataset/datasetProvider/util/idMapper';
import { NodeID } from '../cluster/types';

export function idClustersToRecordClustersNoTable(
  idClusters: (NodeID | undefined)[],
  datasetId: DatasetId
): ExperimentIntersection {
  const idMapper = new DatasetIDMapper(datasetId);
  return {
    header: ['id'],
    data: idClusters.map((id) =>
      id ? [idMapper.mapReversed(id) ?? 'unknown'] : []
    ),
  };
}

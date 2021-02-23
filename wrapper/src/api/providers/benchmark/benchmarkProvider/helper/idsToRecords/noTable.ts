import { ExperimentIntersection } from '../../../../../server/types';

export function idClustersToRecordClustersNoTable(
  idClusters: number[][]
): ExperimentIntersection {
  return {
    header: ['id'],
    data: idClusters.map((cluster) => cluster.map((id) => [id.toString()])),
  };
}

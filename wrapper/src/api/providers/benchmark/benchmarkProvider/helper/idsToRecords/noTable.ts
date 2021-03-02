import { ExperimentIntersection } from '../../../../../server/types';

export function idClustersToRecordClustersNoTable(
  idClusters: number[][]
): ExperimentIntersection {
  return {
    header: ['id'],
    data: idClusters
      .flatMap((cluster) => [...cluster.map((id) => [id.toString()]), []])
      .slice(0, -1),
  };
}

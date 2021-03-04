import {
  ExperimentId,
  ExperimentIntersectionMode,
} from '../../../../../server/types';
import { Subclustering } from '../cluster/subclustering';
import { Clustering } from '../cluster/types';

function getClusterings(experiments: ExperimentId[]): Clustering[] {
  return [];
}

function getSubclustering(experiments: ExperimentId[]): Clustering {
  return (undefined as unknown) as Clustering;
}

export function getIntersection({
  config,
  startAt,
  limit,
  sortBy,
  mode,
}: {
  config: {
    experimentId: ExperimentId;
    predictedCondition: boolean;
    similarityAttribute?: string;
    similarityScore?: number;
  }[];
  startAt?: number;
  limit?: number;
  sortBy?: string;
  mode: ExperimentIntersectionMode;
}): void {
  const clusterings = getClusterings(
    config.map(({ experimentId }) => experimentId)
  );

  const clusterBorders = getSubclustering(
    config
      .filter(({ predictedCondition }) => predictedCondition)
      .map(({ experimentId }) => experimentId)
  );

  // sort by name
  // ids: 1, 2, 3, 4, 5, 6, 7
  // clusterBorders: 1,3,4,5,6 - 2,7
  // false condition detected: 1,3,4 - 2 - 5,6 - 7
  // pairs should return 1,5 - 1,6 - 2,7 - 3,5 - 3,6 - 4,5 - 4,6

  // startAt 3 limit 5
  // should return 1,6 - 2,7
  // how about "gather next" method?

  // TODO überspringen der vorherigen rows??
  const startId = 1;
  const rows: string[] = [];
  while (rows.length < limit) {
    const rows = getRows(startId);
  }

  // auf node ebene speichern wie viele Rows???
}

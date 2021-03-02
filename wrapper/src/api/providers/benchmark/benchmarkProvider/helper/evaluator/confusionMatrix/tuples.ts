import { ExperimentIntersectionMode } from '../../../../../../server/types';
import { relaxedClusteringToArray } from '../../cluster/test/relaxedClusterings';
import { NodeID, Subclustering } from '../../cluster/types';
import { applySubclusteringTransformation } from './modes';

export interface ConfusionMatrixTuples {
  truePositives: NodeID[][];
  falsePositives: NodeID[][];
  falseNegatives: NodeID[][];
}

export function calculateConfusionMatrixTuples(
  goldSubclustering: Subclustering,
  experimentSubclustering: Subclustering,
  mode: ExperimentIntersectionMode
): ConfusionMatrixTuples {
  return {
    truePositives: relaxedClusteringToArray(goldSubclustering).filter(
      (cluster) => cluster.length >= 2
    ),
    falseNegatives: applySubclusteringTransformation(goldSubclustering, mode),
    falsePositives: applySubclusteringTransformation(
      experimentSubclustering,
      mode
    ),
  };
}

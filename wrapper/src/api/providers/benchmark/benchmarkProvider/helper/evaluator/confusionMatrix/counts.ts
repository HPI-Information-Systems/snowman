import { Subclustering } from '../../cluster/types';
import { numberOfPairs } from '../util';

function numberOfRemovedPairs(subclustering: Subclustering) {
  let pairCount = 0;
  for (const subclusters of subclustering.subclusters()) {
    let clusterSize = 0;
    for (const subcluster of subclusters) {
      clusterSize += subcluster.length;
      pairCount -= numberOfPairs(subcluster.length);
    }
    pairCount += numberOfPairs(clusterSize);
  }
  return pairCount;
}

export interface ConfusionMatrixCounts {
  truePositives: number;
  trueNegatives: number;
  falsePositives: number;
  falseNegatives: number;
}

export function calculateConfusionMatrixCounts(
  goldSubclustering: Subclustering,
  experimentSubclustering: Subclustering
): ConfusionMatrixCounts {
  const population = numberOfPairs(goldSubclustering.numberNodes);
  let truePositives = 0;
  for (const cluster of goldSubclustering.clusters()) {
    truePositives += numberOfPairs(cluster.length);
  }
  const falsePositives = numberOfRemovedPairs(experimentSubclustering);
  const falseNegatives = numberOfRemovedPairs(goldSubclustering);
  const trueNegatives =
    population - truePositives - falsePositives - falseNegatives;
  return {
    truePositives,
    trueNegatives,
    falsePositives,
    falseNegatives,
  };
}

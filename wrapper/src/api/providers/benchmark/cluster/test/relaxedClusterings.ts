import { Clustering, NodeID, Subclustering } from '../types';
import { UnionFind } from '../unionFind';

export type RelaxedClustering = Clustering | NodeID[][];
export type RelaxedSubclustering = Subclustering | NodeID[][][];

export function relaxedClusteringToClustering(
  clustering: RelaxedClustering
): Clustering {
  if (Array.isArray(clustering)) {
    const numberNodes = clustering.reduce(
      (length, cluster) => length + cluster.length,
      0
    );
    const unionFind = new UnionFind(numberNodes);
    for (const cluster of clustering) {
      for (let index = 1; index < cluster.length; index++) {
        unionFind.link([[cluster[index - 1], cluster[index]]]);
      }
    }
    clustering = unionFind;
  }
  return clustering;
}

export function relaxedClusteringToArray(
  clustering: RelaxedClustering
): NodeID[][] {
  if (!Array.isArray(clustering)) {
    clustering = [...clustering.clusters()].map((cluster) => [...cluster]);
  }
  return clustering;
}

export function relaxedSubclusteringToArray(
  subclustering: RelaxedSubclustering
): NodeID[][][] {
  if (!Array.isArray(subclustering)) {
    subclustering = [...subclustering.subclusters()].map((clusters) =>
      [...clusters].map((cluster) => [...cluster])
    );
  }
  return subclustering;
}

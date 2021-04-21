import { Clustering, Subclustering } from '../types';

export function expectCorrectClusteringOrder(clustering: Clustering): void {
  let clusterId = -1;
  for (const cluster of clustering.clusters()) {
    expect(cluster.id).toEqual(clusterId + 1);
    clusterId = cluster.id;
  }
}

export function expectCorrectSubClusteringOrder(
  subclustering: Subclustering
): void {
  expectCorrectClusteringOrder(subclustering);
  let baseId = -1;
  for (const subclusters of subclustering.subclusters()) {
    baseId++;
    for (const subcluster of subclusters) {
      expect(baseId).toEqual(subcluster.baseID);
    }
  }
}

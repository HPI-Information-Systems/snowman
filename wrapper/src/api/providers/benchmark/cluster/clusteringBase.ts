import { Cluster, Clustering, NodeID } from './types';

export abstract class ClusteringBase implements Clustering {
  abstract numberNodes: number;
  abstract numberClusters: number;
  abstract numberRows: number;
  abstract numberPairs: number;
  abstract clusters(): Iterable<Cluster>;
  abstract clusterFromNodeId(nodeId: number): Cluster;
  abstract clusterFromClusterId(clusterId: number): Cluster;

  nodesAreLinked(node1: NodeID, node2: NodeID): boolean {
    return (
      this.clusterFromNodeId(node1).id === this.clusterFromNodeId(node2).id
    );
  }
}

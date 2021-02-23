export type NodeID = number;
export type ClusterID = number;
export type NodeLink = [NodeID, NodeID];

export interface Cluster extends Iterable<NodeID> {
  /**
   * guaranteed to range from 0 to (number clusters - 1) in the contained clustering
   */
  readonly id: ClusterID;
  readonly length: number;
}

export interface Clustering {
  readonly numberNodes: number;
  readonly numberClusters: number;
  /**
   * guaranteed to return clusters in order (their cluster id is strict monotonically increasing)
   */
  clusters(): Iterable<Cluster>;
  clusterFromNodeId(nodeId: NodeID): Cluster;
  clusterFromClusterId(clusterId: ClusterID): Cluster;
}

export interface Subclustering extends Clustering {
  /**
   * guaranteed to return clusters in order (their cluster id is strict monotonically increasing)
   */
  subclusters(): Iterable<Iterable<Cluster>>;
}

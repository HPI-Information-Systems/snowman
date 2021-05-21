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
  readonly numberRows: number;
  readonly numberPairs: number;
  /**
   * guaranteed to return clusters in order (their cluster id is strict monotonically increasing)
   */
  clusters(): Iterable<Cluster>;
  clusterFromNodeId(nodeId: NodeID): Cluster;
  clusterFromClusterId(clusterId: ClusterID): Cluster;
}

export interface Subcluster extends Cluster {
  readonly baseID: ClusterID;
  readonly partitionID: ClusterID;
}

export interface Subclustering extends Clustering {
  /**
   * guaranteed to return subclusters in order such that partitionID is strict monotonically increasing
   */
  subclusters(): readonly (readonly Subcluster[])[];
  subclustersFromBaseClusterId(clusterId: ClusterID): readonly Subcluster[];
}

export type MergesT = {
  merges: {
    // IDs before swaps and merges
    group: ClusterID[];
    // ID of combined cluster after swaps and merges
    target: ClusterID;
  }[];
  clusterIDSwaps: [from: ClusterID, to: ClusterID][];
};

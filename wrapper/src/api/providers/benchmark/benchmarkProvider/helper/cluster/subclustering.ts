import { LazyProperty } from '../../../../../tools/lazyProperty';
import { List } from '../../../../../tools/list';
import {
  Cluster,
  ClusterID,
  Clustering,
  NodeID,
  Subclustering as SubclusteringSpec,
} from './types';

class ClusterList extends List<NodeID> implements Cluster {
  constructor(public readonly id: number) {
    super();
  }
}

export class Subclustering implements SubclusteringSpec {
  protected readonly nodeToSubcluster = new LazyProperty(() =>
    this.createNodeToSubcluster()
  );
  protected readonly clusterIdToSubcluster = new LazyProperty(() =>
    this.createClusterIdToSubcluster()
  );
  protected readonly subclusterList: List<List<ClusterList>>;

  readonly numberNodes: number;
  readonly numberClusters: number;

  constructor(base: Clustering, partition: Clustering) {
    this.numberNodes = base.numberNodes;
    [this.numberClusters, this.subclusterList] = this.createSubclusterList(
      base,
      partition
    );
  }

  subclusters(): Iterable<Iterable<Cluster>> {
    return this.subclusterList;
  }

  clusters(): Iterable<Cluster> {
    return this.clusterIdToSubcluster.value;
  }

  clusterFromNodeId(nodeId: NodeID): Cluster {
    return this.nodeToSubcluster.value[nodeId];
  }

  clusterFromClusterId(clusterId: number): Cluster {
    return this.clusterIdToSubcluster.value[clusterId];
  }

  protected createSubclusterList(
    base: Clustering,
    partition: Clustering
  ): [number, List<List<ClusterList>>] {
    let numberClusters = 0;
    const subclusterList = new List<List<ClusterList>>();
    const partitionClusterIdToSubcluster = new Array<ClusterList | undefined>(
      partition.numberClusters
    );
    const partitionedClusterIds = new List<ClusterID>();

    for (const cluster of base.clusters()) {
      for (const nodeId of cluster) {
        const partitionClusterId = partition.clusterFromNodeId(nodeId).id;

        let subcluster = partitionClusterIdToSubcluster[partitionClusterId];
        if (!subcluster) {
          subcluster = new ClusterList(numberClusters++);
          partitionClusterIdToSubcluster[partitionClusterId] = subcluster;
        }

        subcluster.insertFront(nodeId);
        partitionedClusterIds.insertFront(partitionClusterId);
      }

      const subclusters = new List<ClusterList>();
      subclusterList.insertLast(subclusters);

      for (const partitionClusterId of partitionedClusterIds) {
        const subcluster = partitionClusterIdToSubcluster[partitionClusterId];
        if (subcluster) {
          partitionClusterIdToSubcluster[partitionClusterId] = undefined;
          subclusters.insertLast(subcluster);
        }
      }
      partitionedClusterIds.clear();
    }
    return [numberClusters, subclusterList];
  }

  protected createClusterIdToSubcluster(): ClusterList[] {
    const clusterIdToSubcluster = new Array<ClusterList>(this.numberClusters);
    for (const subclusters of this.subclusterList) {
      for (const subcluster of subclusters) {
        clusterIdToSubcluster[subcluster.id] = subcluster;
      }
    }
    return clusterIdToSubcluster;
  }

  protected createNodeToSubcluster(): ClusterList[] {
    const nodeToSubcluster = new Array(this.numberNodes);
    for (const subclusters of this.subclusterList) {
      for (const subcluster of subclusters) {
        for (const nodeId of subcluster) {
          nodeToSubcluster[nodeId] = subcluster;
        }
      }
    }
    return nodeToSubcluster;
  }
}

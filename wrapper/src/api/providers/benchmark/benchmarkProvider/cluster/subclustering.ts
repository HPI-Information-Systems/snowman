import { LazyProperty } from '../../../../tools/lazyProperty';
import {
  Cluster,
  ClusterID,
  Clustering,
  NodeID,
  Subclustering as SubclusteringSpec,
} from './types';

class ClusterArray extends Array<NodeID> implements Cluster {
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
  protected readonly subclusterArray: Array<Array<ClusterArray>>;

  readonly numberNodes: number;
  readonly numberClusters: number;

  constructor(base: Clustering, partition: Clustering) {
    this.numberNodes = base.numberNodes;
    [this.numberClusters, this.subclusterArray] = this.createSubclusterList(
      base,
      partition
    );
  }

  subclusters(): Array<Array<Cluster>> {
    return this.subclusterArray;
  }

  subclustersFromClusterId(clusterId: number): Array<Cluster> {
    return this.subclusterArray[clusterId];
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
  ): [number, Array<Array<ClusterArray>>] {
    let numberClusters = 0;
    const subclusterArray = new Array<Array<ClusterArray>>(base.numberClusters);
    const partitionClusterIdToSubcluster = new Array<ClusterArray | undefined>(
      partition.numberClusters
    );
    for (const cluster of base.clusters()) {
      let numberSubclusters = 0;
      const partitionedClusterIds: ClusterID[] = [];
      for (const nodeId of cluster) {
        const partitionClusterId = partition.clusterFromNodeId(nodeId).id;

        let subcluster = partitionClusterIdToSubcluster[partitionClusterId];
        if (!subcluster) {
          subcluster = new ClusterArray(numberClusters++);
          partitionClusterIdToSubcluster[partitionClusterId] = subcluster;
          ++numberSubclusters;
        }

        subcluster.push(nodeId);
        partitionedClusterIds.push(partitionClusterId);
      }

      const subclusters = new Array<ClusterArray>(numberSubclusters);
      subclusterArray[cluster.id] = subclusters;

      for (const partitionClusterId of partitionedClusterIds) {
        const subcluster = partitionClusterIdToSubcluster[partitionClusterId];
        if (subcluster) {
          partitionClusterIdToSubcluster[partitionClusterId] = undefined;
          subclusters[--numberSubclusters] = subcluster;
        }
      }
    }
    return [numberClusters, subclusterArray];
  }

  protected createClusterIdToSubcluster(): ClusterArray[] {
    const clusterIdToSubcluster = new Array<ClusterArray>(this.numberClusters);
    for (const subclusters of this.subclusterArray) {
      for (const subcluster of subclusters) {
        clusterIdToSubcluster[subcluster.id] = subcluster;
      }
    }
    return clusterIdToSubcluster;
  }

  protected createNodeToSubcluster(): ClusterArray[] {
    const nodeToSubcluster = new Array(this.numberNodes);
    for (const subclusters of this.subclusterArray) {
      for (const subcluster of subclusters) {
        for (const nodeId of subcluster) {
          nodeToSubcluster[nodeId] = subcluster;
        }
      }
    }
    return nodeToSubcluster;
  }
}

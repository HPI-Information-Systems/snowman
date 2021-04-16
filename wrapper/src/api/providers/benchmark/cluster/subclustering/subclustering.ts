import { LazyProperty } from '../../../../tools/lazyProperty';
import { numberOfPairs } from '../../../../tools/numberOfPairs';
import { getTmpArray } from '../../../../tools/tmpArray';
import {
  Cluster,
  ClusterID,
  Clustering,
  NodeID,
  Subcluster,
  Subclustering as SubclusteringSpec,
} from '../types';

class ArraySubcluster extends Array<NodeID> implements Subcluster {
  constructor(
    public readonly id: ClusterID,
    public readonly baseID: ClusterID,
    public readonly partitionID: ClusterID
  ) {
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
  protected readonly subclusterArray: Array<Array<ArraySubcluster>>;

  readonly numberNodes: number;
  readonly numberClusters: number;
  readonly numberPairs: number;
  readonly numberRows: number;

  constructor(base: Clustering, partition: Clustering) {
    this.numberNodes = base.numberNodes;
    [
      this.numberClusters,
      this.numberPairs,
      this.numberRows,
      this.subclusterArray,
    ] = this.createSubclusterArray(base, partition);
  }

  subclusters(): Array<Array<ArraySubcluster>> {
    return this.subclusterArray;
  }

  subclustersFromBaseClusterId(clusterId: number): Array<ArraySubcluster> {
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

  protected createSubclusterArray(
    base: Clustering,
    partition: Clustering
  ): [
    numberClusters: number,
    numberPairs: number,
    numberRows: number,
    subclusterArray: Array<Array<ArraySubcluster>>
  ] {
    let numberClusters = 0;
    let numberPairs = 0;
    let numberRows = 0;
    const subclusterArray = new Array<Array<ArraySubcluster>>(
      base.numberClusters
    );
    const partitionClusterIdToSubcluster = getTmpArray<ArraySubcluster>(
      partition.numberClusters
    );
    for (const baseCluster of base.clusters()) {
      let numberSubclusters = 0;
      const partitionedClusterIds: ClusterID[] = [];
      for (const nodeId of baseCluster) {
        const partitionClusterId = partition.clusterFromNodeId(nodeId).id;
        let subcluster = partitionClusterIdToSubcluster[partitionClusterId];
        if (!subcluster) {
          subcluster = new ArraySubcluster(
            numberClusters++,
            baseCluster.id,
            partitionClusterId
          );
          partitionedClusterIds.push(partitionClusterId);
          partitionClusterIdToSubcluster[partitionClusterId] = subcluster;
          ++numberSubclusters;
        }
        subcluster.push(nodeId);
      }

      const subclusters = new Array<ArraySubcluster>(numberSubclusters);
      subclusterArray[baseCluster.id] = subclusters;

      for (const partitionClusterId of partitionedClusterIds) {
        const subcluster = partitionClusterIdToSubcluster[partitionClusterId];
        if (subcluster) {
          partitionClusterIdToSubcluster[partitionClusterId] = undefined;
          subclusters[--numberSubclusters] = subcluster;
          numberPairs += numberOfPairs(subcluster.length);
          if (subcluster.length >= 2) {
            numberRows += subcluster.length + 1;
          }
        }
      }
    }
    return [
      numberClusters,
      numberPairs,
      Math.max(0, numberRows - 1),
      subclusterArray,
    ];
  }

  protected createClusterIdToSubcluster(): ArraySubcluster[] {
    const clusterIdToSubcluster = new Array<ArraySubcluster>(
      this.numberClusters
    );
    for (const subclusters of this.subclusterArray) {
      for (const subcluster of subclusters) {
        clusterIdToSubcluster[subcluster.id] = subcluster;
      }
    }
    return clusterIdToSubcluster;
  }

  protected createNodeToSubcluster(): ArraySubcluster[] {
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

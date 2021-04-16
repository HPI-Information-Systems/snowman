import { flattenDeep } from '../../../../tools/flattenDeep';
import { numberOfPairs } from '../../../../tools/numberOfPairs';
import { getTmpArray } from '../../../../tools/tmpArray';
import { NestedArray } from '../../../../tools/types';
import {
  Cluster,
  ClusterID,
  Clustering,
  MergesT,
  NodeID,
  NodeLink,
} from '../types';
import { Node } from './node';

export class UnionFind implements Clustering {
  protected readonly nodes: Node[];
  protected readonly clusterIdToCluster: Node[];
  protected _numberClusters: number;
  protected _numberPairs = 0;

  get numberClusters(): number {
    return this._numberClusters;
  }

  get numberPairs(): number {
    return this._numberPairs;
  }

  constructor(public readonly numberNodes: number) {
    this._numberClusters = numberNodes;
    this.nodes = new Array<Node>(numberNodes);
    this.clusterIdToCluster = new Array<Node>(numberNodes);
    for (let id = 0; id < numberNodes; id++) {
      this.clusterIdToCluster[id] = this.nodes[id] = new Node(id, id);
    }
  }

  protected clusterIDSwap(child: Node): void {
    this._numberClusters--;
    const nodeWithLargestClusterId = this.clusterIdToCluster[
      this._numberClusters
    ];
    nodeWithLargestClusterId._clusterId = child._clusterId;
    this.clusterIdToCluster[
      nodeWithLargestClusterId._clusterId
    ] = nodeWithLargestClusterId;
  }

  protected merge(root1: Node, root2: Node): boolean {
    const length1 = root1.length;
    const length2 = root2.length;
    if (root1.union(root2)) {
      const [newChild, newRoot] = root1.isRoot
        ? [root2, root1]
        : [root1, root2];
      this._numberPairs +=
        numberOfPairs(newRoot.length) -
        numberOfPairs(length1) -
        numberOfPairs(length2);
      this.clusterIDSwap(newChild);
      return true;
    } else {
      return false;
    }
  }

  link(links: NodeLink[]): this {
    for (const [nodeID1, nodeID2] of links) {
      this.merge(this.nodes[nodeID1].root, this.nodes[nodeID2].root);
    }
    return this;
  }

  protected extractRootsAndClusterIDs(
    links: NodeLink[]
  ): [[Node, ClusterID], [Node, ClusterID]][] {
    return links.map(
      (nodeIDs) =>
        nodeIDs
          .map((nodeID) => this.nodes[nodeID].root)
          .map((root) => [root, root._clusterId]) as [
          [Node, ClusterID],
          [Node, ClusterID]
        ]
    );
  }

  protected trackClusterIDSwap(
    child: ClusterID,
    mergeGroupTargets: ClusterID[],
    mergeGroups: (NestedArray<ClusterID>[] | undefined)[],
    clusterIDSwaps: [ClusterID, ClusterID][]
  ): void {
    if (child !== this._numberClusters) {
      clusterIDSwaps.push([child, this._numberClusters]);
      const removedClusterGroup = mergeGroups[this._numberClusters];
      if (removedClusterGroup) {
        mergeGroupTargets.push(child);
        mergeGroups[child] = removedClusterGroup;
        mergeGroups[this._numberClusters] = undefined;
      }
    }
  }

  protected trackMerge(
    child: ClusterID,
    childInitialID: ClusterID,
    root: ClusterID,
    rootInitialID: ClusterID,
    mergeGroupTargets: ClusterID[],
    mergeGroups: (NestedArray<ClusterID>[] | undefined)[],
    clusterIDSwaps: [ClusterID, ClusterID][]
  ): void {
    let targetGroup = mergeGroups[root];
    if (!targetGroup) {
      mergeGroupTargets.push(root);
      targetGroup = [rootInitialID];
      mergeGroups[root] = targetGroup;
    }
    const fromGroup = mergeGroups[child];
    if (fromGroup) {
      targetGroup.push(fromGroup);
      mergeGroups[child] = undefined;
    } else {
      targetGroup.push(childInitialID);
    }
    this.trackClusterIDSwap(
      child,
      mergeGroupTargets,
      mergeGroups,
      clusterIDSwaps
    );
  }

  protected performTrackedMerge(
    [root1, initialClusterID1]: [Node, ClusterID],
    [root2, initialClusterID2]: [Node, ClusterID],
    mergeGroupTargets: ClusterID[],
    mergeGroups: (NestedArray<ClusterID>[] | undefined)[],
    clusterIDSwaps: [ClusterID, ClusterID][]
  ): void {
    root1 = root1.root;
    root2 = root2.root;
    const clusterID1 = root1._clusterId;
    const clusterID2 = root2._clusterId;
    if (this.merge(root1, root2)) {
      const [
        rootClusterID,
        rootInitialClusterID,
        childClusterID,
        childInitialClusterID,
      ] = root1.isRoot
        ? [clusterID1, initialClusterID1, clusterID2, initialClusterID2]
        : [clusterID2, initialClusterID2, clusterID1, initialClusterID1];
      this.trackMerge(
        childClusterID,
        childInitialClusterID,
        rootClusterID,
        rootInitialClusterID,
        mergeGroupTargets,
        mergeGroups,
        clusterIDSwaps
      );
    }
  }

  protected extractMerges(
    mergeGroupTargets: number[],
    mergeGroups: (NestedArray<ClusterID>[] | undefined)[],
    clusterIDSwaps: [ClusterID, ClusterID][]
  ): MergesT {
    const merges: MergesT = {
      clusterIDSwaps,
      merges: [],
    };
    for (const targetClusterID of mergeGroupTargets) {
      const targetGroup = mergeGroups[targetClusterID];
      if (targetGroup) {
        mergeGroups[targetClusterID] = undefined;
        merges.merges.push({
          group: flattenDeep(targetGroup),
          target: targetClusterID,
        });
      }
    }
    return merges;
  }

  trackedLink(links: NodeLink[]): MergesT {
    const rootsAndClusterIDs = this.extractRootsAndClusterIDs(links);
    const mergeGroupTargets: number[] = [];
    const mergeGroups = getTmpArray<NestedArray<ClusterID>[]>(
      this._numberClusters
    );
    const clusterIDSwaps: [ClusterID, ClusterID][] = [];
    for (const toMerge of rootsAndClusterIDs) {
      this.performTrackedMerge(
        ...toMerge,
        mergeGroupTargets,
        mergeGroups,
        clusterIDSwaps
      );
    }
    return this.extractMerges(mergeGroupTargets, mergeGroups, clusterIDSwaps);
  }

  *clusters(): Iterable<Cluster> {
    for (let clusterId = 0; clusterId < this._numberClusters; clusterId++) {
      yield this.clusterIdToCluster[clusterId];
    }
  }

  clusterFromNodeId(nodeID: NodeID): Cluster {
    return this.nodes[nodeID].root;
  }

  clusterFromClusterId(clusterId: number): Cluster {
    return this.clusterIdToCluster[clusterId];
  }
}

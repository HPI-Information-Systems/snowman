import { getTmpArray } from '../../../../tools/array';
import { flattenDeep } from '../../../../tools/flattenDeep';
import { NestedArray } from '../../../../tools/types';
import { ClusterID, MergesT, NodeLink } from '../types';
import { Node } from './node';
import { UnionFindBase } from './unionFindBase';

export class TrackableUnionFind extends UnionFindBase {
  trackedLink(links: NodeLink[]): MergesT {
    const rootsAndClusterIDs = this.extractRootsAndClusterIDs(links);
    const mergeGroupTargets: number[] = [];
    const mergeGroups = getTmpArray<NestedArray<ClusterID>[]>(
      this._numberClusters
    );
    const clusterIDSwaps: MergesT['clusterIDSwaps'] = [];
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
    clusterIDSwaps: MergesT['clusterIDSwaps']
  ): void {
    const from = this._numberClusters;
    const to = child;
    if (to !== from) {
      clusterIDSwaps.push([from, to]);
      const fromClusterGroup = mergeGroups[from];
      if (fromClusterGroup) {
        mergeGroupTargets.push(to);
        mergeGroups[to] = fromClusterGroup;
        mergeGroups[from] = undefined;
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
    clusterIDSwaps: MergesT['clusterIDSwaps']
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
    clusterIDSwaps: MergesT['clusterIDSwaps']
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
    clusterIDSwaps: MergesT['clusterIDSwaps']
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
}

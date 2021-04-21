import { getTmpArray, reduceLength } from '../../../../tools/array';
import {
  ClusterID,
  Clustering,
  MergesT,
  NodeID,
  Subcluster,
  Subclustering,
} from '../types';
import { Node } from '../unionFind/node';
import { UnionFindBase } from '../unionFind/unionFindBase';

class ModularSubcluster implements Subcluster {
  constructor(
    readonly cluster: Node,
    readonly partitionID: ClusterID,
    readonly base: { id: ClusterID }
  ) {}

  get baseID() {
    return this.base.id;
  }

  get id() {
    return this.cluster.id;
  }

  get length() {
    return this.cluster.length;
  }

  *[Symbol.iterator](): IterableIterator<ClusterID> {
    yield* this.cluster;
  }
}

export class ModularSubclustering
  extends UnionFindBase
  implements Subclustering {
  protected modularClusterToThisClusters: ModularSubcluster[][];
  protected fixedPartitionNumberClusters: number;

  constructor(
    fixedPartition: Clustering,
    modularPartitionedByFixed: Subclustering
  ) {
    super(fixedPartition.numberNodes);
    this.fixedPartitionNumberClusters = fixedPartition.numberClusters;
    this.modularClusterToThisClusters = [];
    for (
      let modularClusterID = 0;
      modularClusterID < modularPartitionedByFixed.subclusters().length;
      ++modularClusterID
    ) {
      const thisClusters: ModularSubcluster[] = [];
      this.modularClusterToThisClusters.push(thisClusters);
      const subclusters = modularPartitionedByFixed.subclustersFromBaseClusterId(
        modularClusterID
      );
      const baseRef = { id: modularClusterID };
      for (const [fixedClusterID, subcluster] of subclusters.map(
        (cluster) =>
          [cluster.partitionID, [...cluster]] as [ClusterID, NodeID[]]
      )) {
        for (let index = 1; index < subcluster.length; ++index) {
          this.link([[subcluster[index], subcluster[index - 1]]]);
        }
        thisClusters.push(
          new ModularSubcluster(
            this.nodes[subcluster[0]].root,
            fixedClusterID,
            baseRef
          )
        );
      }
    }
  }

  subclusters(): readonly (readonly Subcluster[])[] {
    return this.modularClusterToThisClusters;
  }

  subclustersFromBaseClusterId(clusterId: ClusterID): readonly Subcluster[] {
    return this.modularClusterToThisClusters[clusterId];
  }

  update({ merges, clusterIDSwaps }: MergesT): void {
    const [reduceClusterCount, targets] = this.extractTargets(merges);
    this.performSwaps(clusterIDSwaps, reduceClusterCount);
    this.applyTargets(targets);
  }

  protected gatherTargetClusters(
    group: ModularSubcluster[][]
  ): [(Node[] | undefined)[], ClusterID[]] {
    const fixedClusterIDToThisClusters = getTmpArray<Node[]>(
      this.fixedPartitionNumberClusters
    );
    const occuringFixedClusterIDs: ClusterID[] = [];
    for (const clusters of group) {
      for (const { cluster, partitionID: fixed } of clusters) {
        let thisClusters = fixedClusterIDToThisClusters[fixed];
        if (!thisClusters) {
          thisClusters = [];
          fixedClusterIDToThisClusters[fixed] = thisClusters;
          occuringFixedClusterIDs.push(fixed);
        }
        thisClusters.push(cluster.root);
      }
    }
    return [fixedClusterIDToThisClusters, occuringFixedClusterIDs];
  }

  protected mergeTargetClusters(
    target: ClusterID,
    fixedClusterIDToThisClusters: (Node[] | undefined)[],
    occuringFixedClusterIDs: ClusterID[]
  ): ModularSubcluster[] {
    const targetClusters: ModularSubcluster[] = [];
    const targetRef = {
      id: target,
    };
    for (const fixed of occuringFixedClusterIDs) {
      const thisClusters = fixedClusterIDToThisClusters[fixed];
      if (thisClusters) {
        fixedClusterIDToThisClusters[fixed] = undefined;
        for (let index = 1; index < thisClusters.length; ++index) {
          this.link([
            [thisClusters[index].nodeId, thisClusters[index - 1].nodeId],
          ]);
        }
        targetClusters.push(
          new ModularSubcluster(thisClusters[0].root, fixed, targetRef)
        );
      }
    }
    return targetClusters;
  }

  protected mergeGroup(
    group: ModularSubcluster[][],
    target: ClusterID
  ): [
    reduceClusterCount: number,
    merged: ReturnType<ModularSubclustering['extractTargets']>[1][number]
  ] {
    return [
      group.length - 1,
      [
        target,
        this.mergeTargetClusters(target, ...this.gatherTargetClusters(group)),
      ],
    ];
  }

  protected extractTargets(
    merges: MergesT['merges']
  ): [
    reduceClusterCount: number,
    targets: [modularClusterID: ClusterID, thisClusters: ModularSubcluster[]][]
  ] {
    let reduceClusterCount = 0;
    const targets: ReturnType<ModularSubclustering['extractTargets']>[1] = [];
    for (const { group, target } of merges) {
      const [reduce, merged] = this.mergeGroup(
        group.map(
          (modularClusterID) =>
            this.modularClusterToThisClusters[modularClusterID]
        ),
        target
      );
      reduceClusterCount += reduce;
      targets.push(merged);
    }
    return [reduceClusterCount, targets];
  }

  protected performSwaps(
    swaps: MergesT['clusterIDSwaps'],
    reduceClusterCount: number
  ): void {
    for (const [from, to] of swaps) {
      this.modularClusterToThisClusters[from][0].base.id = to;
      this.modularClusterToThisClusters[to] = this.modularClusterToThisClusters[
        from
      ];
    }
    reduceLength(this.modularClusterToThisClusters, reduceClusterCount);
  }

  protected applyTargets(
    targets: ReturnType<ModularSubclustering['extractTargets']>[1]
  ): void {
    for (const [modularClusterID, thisClusters] of targets) {
      this.modularClusterToThisClusters[modularClusterID] = thisClusters;
    }
  }
}

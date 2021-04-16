import { getTmpArray } from '../../../../tools/tmpArray';
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
    readonly baseID: ClusterID,
    readonly partition: { id: ClusterID }
  ) {}

  get partitionID() {
    return this.partition.id;
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

  constructor(
    protected readonly fixedPartition: Clustering,
    modularPartitionedByFixed: Subclustering
  ) {
    super(fixedPartition.numberNodes);
    this.modularClusterToThisClusters = new Array(
      modularPartitionedByFixed.subclusters().length
    );
    for (
      let modularClusterID = 0;
      modularClusterID < this.modularClusterToThisClusters.length;
      ++modularClusterID
    ) {
      const thisClusters: ModularSubcluster[] = (this.modularClusterToThisClusters[
        modularClusterID
      ] = []);
      const subclusters = modularPartitionedByFixed.subclustersFromBaseClusterId(
        modularClusterID
      );
      const partitionRef = { id: modularClusterID };
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
            partitionRef
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
      this.fixedPartition.numberClusters
    );
    const occuringFixedClusterIDs: ClusterID[] = [];
    for (const clusters of group) {
      for (const { cluster, baseID: fixed } of clusters) {
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
      this.modularClusterToThisClusters[from][0].partition.id = to;
      this.modularClusterToThisClusters[to] = this.modularClusterToThisClusters[
        from
      ];
    }
    for (let index = 0; index < reduceClusterCount; index++) {
      this.modularClusterToThisClusters.pop();
    }
  }

  protected applyTargets(
    targets: ReturnType<ModularSubclustering['extractTargets']>[1]
  ): void {
    for (const [modularClusterID, thisClusters] of targets) {
      this.modularClusterToThisClusters[modularClusterID] = thisClusters;
    }
  }
}

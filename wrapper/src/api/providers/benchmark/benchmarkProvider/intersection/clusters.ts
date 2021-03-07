import binarySearch from 'binary-search';

import { compareNumbers } from '../../../../tools/comparators';
import { ClusterID, NodeID, Subclustering } from '../helper/cluster/types';
import { IntersectionCache } from './cache';
import { IntersectionCounts } from './counts';

export class IntersectionClusters extends IntersectionCounts {
  clusters(startAt = 0, limit?: number): (NodeID | undefined)[] {
    let clusterId = this.findCluster(startAt);
    let startCluster: undefined | (NodeID | undefined)[] = undefined;
    while (this.isUnknownCluster(clusterId)) {
      startCluster = this.calculateNextUnknownCluster();
      clusterId = this.findCluster(startAt, clusterId);
    }
    if (!startCluster) {
      startCluster = this.calculateCluster(clusterId);
    }
    const clusters = startCluster.slice(
      this.numberRowsToSkipInStartCluster(clusterId, startAt)
    );
    while (
      (!limit || clusters.length < limit) &&
      ++clusterId < this.clustering.numberClusters
    ) {
      if (this.isUnknownCluster(clusterId)) {
        clusters.push(...this.calculateNextUnknownCluster());
      } else {
        clusters.push(...this.calculateCluster(clusterId));
      }
    }
    return clusters.slice(0, limit);
  }

  protected accumulatedRowCounts: number[] = [];
  protected get numberKnownRows(): number {
    return this.accumulatedRowCounts.length === 0
      ? 0
      : this.accumulatedRowCounts[this.accumulatedRowCounts.length - 1];
  }

  /**
   * @returns index of cluster or array length if unknown
   */
  protected findCluster(
    startAt: number,
    lowestStartCluster?: ClusterID
  ): number {
    const rowCountsIndex = binarySearch(
      this.accumulatedRowCounts,
      startAt,
      compareNumbers,
      lowestStartCluster
    );
    return rowCountsIndex < 0 ? ~rowCountsIndex : rowCountsIndex + 1;
  }

  protected isUnknownCluster(startCluster: ClusterID): boolean {
    return startCluster >= this.accumulatedRowCounts.length;
  }

  protected numberRowsToSkipInStartCluster(
    startCluster: ClusterID,
    startAt: number
  ): number {
    if (startCluster === 0) {
      return startAt;
    } else {
      return startAt - this.accumulatedRowCounts[startCluster - 1];
    }
  }

  protected calculateNextUnknownCluster(): (NodeID | undefined)[] {
    const cluster = this.calculateCluster(this.accumulatedRowCounts.length);
    this.accumulatedRowCounts.push(this.numberKnownRows + cluster.length);
    return cluster;
  }

  protected calculateCluster(clusterId: ClusterID): (NodeID | undefined)[] {
    if (this.predictedConditionNegative.length === 0) {
      return [...this.clustering.clusterFromClusterId(clusterId), undefined];
    } else if (this.predictedConditionNegative.length === 1) {
      const pairs = [];
      const subclustering = IntersectionCache.get(
        [
          ...this.predictedConditionPositive,
          ...this.predictedConditionNegative,
        ],
        []
      ).clustering as Subclustering;
      const subclusters = subclustering.subclustersFromClusterId(clusterId);
      for (let lower = 0; lower < subclusters.length; lower++) {
        const lowerSubcluster = subclusters[lower];
        for (const lowerId of lowerSubcluster) {
          for (let upper = lower + 1; upper < subclusters.length; upper++) {
            const upperSubcluster = subclusters[upper];
            for (const upperId of upperSubcluster) {
              pairs.push(lowerId, upperId, undefined);
            }
          }
        }
      }
      return pairs;
    } else {
      throw new Error(
        'Calculating clusters with more than one predicted condition negative is not supported yet.'
      );
    }
  }
}

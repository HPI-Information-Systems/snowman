import { Cluster, ClusterID } from '../../cluster/types';
import { SubclusterCache } from '../cache';
import { CalculatePairs } from './base';

export class CalculatePairs1Negative extends CalculatePairs {
  protected subclusters: Cluster[] = [];
  protected skipRemains = 0;
  protected rows: (ClusterID | undefined)[] = [];

  protected calculatePairs(): ReturnType<CalculatePairs['calculatePairs']> {
    this.rows = [];
    this.skipRemains = this.skip;
    this.subclusters = SubclusterCache.get(
      this.intersection.predictedConditionPositive,
      this.intersection.predictedConditionNegative,
      this.intersection.datasetId
    ).clustering.subclustersFromClusterId(this.clusterId);
    this.calculatePairsPrepared();
    return [this.skip - this.skipRemains, this.rows];
  }

  protected calculatePairsPrepared(): void {
    let remainingClusterLength = this.intersection.positiveIntersection.clustering.clusterFromClusterId(
      this.clusterId
    ).length;
    for (let lower = 0; lower < this.subclusters.length; lower++) {
      const lowerSubcluster = this.subclusters[lower];
      remainingClusterLength -= lowerSubcluster.length;
      const numberRows = remainingClusterLength * lowerSubcluster.length * 3;
      if (this.skipRemains >= numberRows) {
        this.skipRemains -= numberRows;
      } else {
        if (this.calculatePairsFromLower(lower, lowerSubcluster)) {
          return;
        }
      }
    }
  }

  protected calculatePairsFromLower(
    lower: number,
    lowerSubcluster: Cluster
  ): boolean {
    for (let upper = lower + 1; upper < this.subclusters.length; upper++) {
      const upperSubcluster = this.subclusters[upper];
      const numberRows = upperSubcluster.length * lowerSubcluster.length * 3;
      if (this.skipRemains >= numberRows) {
        this.skipRemains -= numberRows;
      } else {
        if (
          this.calculatePairsFromLowerAndUpper(lowerSubcluster, upperSubcluster)
        ) {
          return true;
        }
      }
    }
    return false;
  }

  protected calculatePairsFromLowerAndUpper(
    lowerSubcluster: Cluster,
    upperSubcluster: Cluster
  ): boolean {
    for (const upperId of upperSubcluster) {
      const numberRows = lowerSubcluster.length * 3;
      if (this.skipRemains >= numberRows) {
        this.skipRemains -= numberRows;
      } else {
        if (this.addPairsFromUpperId(lowerSubcluster, upperId)) {
          return true;
        }
      }
    }
    return false;
  }

  protected addPairsFromUpperId(
    lowerSubcluster: Cluster,
    upperId: ClusterID
  ): boolean {
    for (const lowerId of lowerSubcluster) {
      const numberRows = 3;
      if (this.skipRemains >= numberRows) {
        this.skipRemains -= numberRows;
      } else {
        const addedRows = [lowerId, upperId, undefined].slice(
          this.skipRemains,
          this.skipRemains + this.limit
        );
        this.rows.push(...addedRows);
        this.limit -= addedRows.length;
        this.skipRemains = 0;
        if (this.limit === 0) {
          return true;
        }
      }
    }
    return false;
  }
}

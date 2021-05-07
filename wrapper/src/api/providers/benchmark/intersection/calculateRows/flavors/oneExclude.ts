import { SubclusterCache } from '../../../cache';
import { IntersectionCache } from '../../../cache/flavors/intersectionCache';
import { Cluster, ClusterID } from '../../../cluster/types';
import { IntersectionOnlyIncludes } from '../../intersectionOnlyIncludes';
import { CalculateRowsFlavor } from './base';

export class CalculateRowsOneExclude extends CalculateRowsFlavor {
  protected subclusters: readonly Cluster[] = [];
  protected skipRemains = 0;
  protected rows: (ClusterID | undefined)[] = [];

  protected calculateRows(): ReturnType<CalculateRowsFlavor['calculateRows']> {
    this.rows = [];
    this.skipRemains = this.skip;
    this.subclusters = SubclusterCache.get({
      datasetId: this.config.datasetId,
      base: this.config.included,
      partition: this.config.excluded,
      forceStatic: this.config.forceStatic,
    }).clustering.subclustersFromBaseClusterId(this.clusterId);
    this.calculateRowsPrepared();
    return [this.skip - this.skipRemains, this.rows];
  }

  protected calculateRowsPrepared(): void {
    let remainingClusterLength = (IntersectionCache.get({
      datasetId: this.config.datasetId,
      included: this.config.included,
      excluded: [],
      forceStatic: this.config.forceStatic,
    }) as IntersectionOnlyIncludes).clustering.clusterFromClusterId(
      this.clusterId
    ).length;
    for (let lower = 0; lower < this.subclusters.length; lower++) {
      const lowerSubcluster = this.subclusters[lower];
      remainingClusterLength -= lowerSubcluster.length;
      const numberRows = remainingClusterLength * lowerSubcluster.length * 3;
      if (this.skipRemains >= numberRows) {
        this.skipRemains -= numberRows;
      } else {
        if (this.calculateRowsFromLower(lower, lowerSubcluster)) {
          return;
        }
      }
    }
  }

  protected calculateRowsFromLower(
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
          this.calculateRowsFromLowerAndUpper(lowerSubcluster, upperSubcluster)
        ) {
          return true;
        }
      }
    }
    return false;
  }

  protected calculateRowsFromLowerAndUpper(
    lowerSubcluster: Cluster,
    upperSubcluster: Cluster
  ): boolean {
    for (const upperId of upperSubcluster) {
      const numberRows = lowerSubcluster.length * 3;
      if (this.skipRemains >= numberRows) {
        this.skipRemains -= numberRows;
      } else {
        if (this.addRowsFromUpperId(lowerSubcluster, upperId)) {
          return true;
        }
      }
    }
    return false;
  }

  protected addRowsFromUpperId(
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

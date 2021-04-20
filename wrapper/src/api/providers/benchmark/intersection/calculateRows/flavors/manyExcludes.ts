import { newEmptyArray } from '../../../../../tools/array';
import { LazyProperty } from '../../../../../tools/lazyProperty';
import { SubclusterCache } from '../../../cache';
import { IntersectionCache } from '../../../cache/flavors/intersectionCache';
import { Subclustering } from '../../../cluster/types';
import { Cluster, ClusterID, Clustering } from '../../../cluster/types';
import { IntersectionOnlyIncludes } from '../../intersectionOnlyIncludes';
import { CalculateRowsFlavor } from './base';

export class CalculateRowsManyExcludes extends CalculateRowsFlavor {
  protected subclusters: readonly Cluster[] = [];
  protected skipRemains = 0;
  protected rows: (ClusterID | undefined)[] = [];

  protected get subclustering(): Subclustering {
    return SubclusterCache.get({
      datasetId: this.config.datasetId,
      base: this.config.included,
      partition: this.config.excluded.slice(0, 1),
    }).clustering;
  }

  protected readonly rowCountCache = new LazyProperty(() =>
    newEmptyArray<number>(this.subclustering.numberClusters)
  );
  protected negativeClusterings: Clustering[] = [];

  protected calculateRows(): ReturnType<CalculateRowsFlavor['calculateRows']> {
    this.negativeClusterings = this.config.excluded.slice(1).map(
      (experimentConfig) =>
        (IntersectionCache.get({
          datasetId: this.config.datasetId,
          included: [experimentConfig],
          excluded: [],
        }) as IntersectionOnlyIncludes).clustering
    );
    this.rows = [];
    this.skipRemains = this.skip;
    this.subclusters = this.subclustering.subclustersFromBaseClusterId(
      this.clusterId
    );
    this.calculateRowsPrepared();
    return [this.skip - this.skipRemains, this.rows];
  }

  protected calculateRowsPrepared(): void {
    for (let lower = 0; lower < this.subclusters.length; lower++) {
      const lowerSubcluster = this.subclusters[lower];
      const numberRows = this.rowCountCache.value[lowerSubcluster.id];
      if (numberRows !== undefined && this.skipRemains >= numberRows) {
        this.skipRemains -= numberRows;
      } else {
        const numberRows = this.calculateRowsFromLower(lower, lowerSubcluster);
        if (numberRows === undefined) {
          return;
        } else {
          this.rowCountCache.value[lowerSubcluster.id] = numberRows;
        }
      }
    }
  }

  protected calculateRowsFromLower(
    lower: number,
    lowerSubcluster: Cluster
  ): number | undefined {
    let numberRows = 0;
    for (let upper = lower + 1; upper < this.subclusters.length; upper++) {
      const upperSubcluster = this.subclusters[upper];
      const addedRowCount = this.calculateRowsFromLowerAndUpper(
        lowerSubcluster,
        upperSubcluster
      );
      if (addedRowCount === undefined) {
        return undefined;
      } else {
        numberRows += addedRowCount;
      }
    }
    return numberRows;
  }

  protected calculateRowsFromLowerAndUpper(
    lowerSubcluster: Cluster,
    upperSubcluster: Cluster
  ): number | undefined {
    let numberRows = 0;
    for (const upperId of upperSubcluster) {
      const addedRowCount = this.addRowsFromUpperId(lowerSubcluster, upperId);
      if (addedRowCount === undefined) {
        return undefined;
      } else {
        numberRows += addedRowCount;
      }
    }
    return numberRows;
  }

  protected addRowsFromUpperId(
    lowerSubcluster: Cluster,
    upperId: ClusterID
  ): number | undefined {
    let numberRows = 0;
    for (const lowerId of lowerSubcluster) {
      if (
        this.negativeClusterings.every(
          (clustering) =>
            clustering.clusterFromNodeId(upperId) !==
            clustering.clusterFromNodeId(lowerId)
        )
      ) {
        const rowCount = 3;
        if (this.skipRemains >= rowCount) {
          this.skipRemains -= rowCount;
        } else {
          const addedRows = [lowerId, upperId, undefined].slice(
            this.skipRemains,
            this.skipRemains + this.limit
          );
          this.rows.push(...addedRows);
          numberRows += addedRows.length;
          this.limit -= addedRows.length;
          this.skipRemains = 0;
          if (this.limit === 0) {
            return undefined;
          }
        }
      }
    }
    return numberRows;
  }
}

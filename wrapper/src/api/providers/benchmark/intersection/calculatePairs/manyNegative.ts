import { newEmptyArray } from '../../../../tools/array';
import { LazyProperty } from '../../../../tools/lazyProperty';
import { Subclustering } from '../../cluster/subclustering';
import { Cluster, ClusterID, Clustering } from '../../cluster/types';
import { IntersectionCache, SubclusterCache } from '../cache';
import { CalculatePairs } from './base';

export class CalculatePairsManyNegative extends CalculatePairs {
  protected subclusters: Cluster[] = [];
  protected skipRemains = 0;
  protected rows: (ClusterID | undefined)[] = [];

  protected get subclustering(): Subclustering {
    return SubclusterCache.get(
      this.intersection.datasetId,
      this.intersection.positive,
      this.intersection.positiveSimilarityThresholds,
      this.intersection.positiveSimilarityFunctions,
      this.intersection.negative.slice(0, 1),
      this.intersection.negativeSimilarityThresholds.slice(0, 1),
      this.intersection.negativeSimilarityFunctions.slice(0, 1)
    ).clustering;
  }

  protected readonly rowCountCache = new LazyProperty(() =>
    newEmptyArray<number>(this.subclustering.numberClusters)
  );
  protected negativeClusterings: Clustering[] = [];

  protected calculatePairs(): ReturnType<CalculatePairs['calculatePairs']> {
    this.negativeClusterings = this.intersection.negative
      .slice(1)
      .map(
        (experimentId, index) =>
          IntersectionCache.get(
            this.intersection.datasetId,
            [experimentId],
            [this.intersection.negativeSimilarityThresholds[index + 1]],
            [this.intersection.negativeSimilarityFunctions[index + 1]],
            [],
            [],
            []
          ).clustering
      );
    this.rows = [];
    this.skipRemains = this.skip;
    this.subclusters = this.subclustering.subclustersFromBaseClusterId(
      this.clusterId
    );
    this.calculatePairsPrepared();
    return [this.skip - this.skipRemains, this.rows];
  }

  protected calculatePairsPrepared(): void {
    for (let lower = 0; lower < this.subclusters.length; lower++) {
      const lowerSubcluster = this.subclusters[lower];
      const numberRows = this.rowCountCache.value[lowerSubcluster.id];
      if (numberRows !== undefined && this.skipRemains >= numberRows) {
        this.skipRemains -= numberRows;
      } else {
        const numberRows = this.calculatePairsFromLower(lower, lowerSubcluster);
        if (numberRows === undefined) {
          return;
        } else {
          this.rowCountCache.value[lowerSubcluster.id] = numberRows;
        }
      }
    }
  }

  protected calculatePairsFromLower(
    lower: number,
    lowerSubcluster: Cluster
  ): number | undefined {
    let numberRows = 0;
    for (let upper = lower + 1; upper < this.subclusters.length; upper++) {
      const upperSubcluster = this.subclusters[upper];
      const addedRowCount = this.calculatePairsFromLowerAndUpper(
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

  protected calculatePairsFromLowerAndUpper(
    lowerSubcluster: Cluster,
    upperSubcluster: Cluster
  ): number | undefined {
    let numberRows = 0;
    for (const upperId of upperSubcluster) {
      const addedRowCount = this.addPairsFromUpperId(lowerSubcluster, upperId);
      if (addedRowCount === undefined) {
        return undefined;
      } else {
        numberRows += addedRowCount;
      }
    }
    return numberRows;
  }

  protected addPairsFromUpperId(
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

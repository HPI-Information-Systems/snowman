import binarySearch from 'binary-search';

import { compareNumbers } from '../../../../tools/comparators';
import { LazyProperty } from '../../../../tools/lazyProperty';
import { ClusterID, NodeID } from '../cluster/types';
import {
  CalculatePairs1Negative,
  CalculatePairsManyNegative,
  CalculatePairsNoNegative,
} from './calculatePairs';
import { CalculatePairs } from './calculatePairs/base';
import { IntersectionCounts } from './counts';

export class IntersectionClusters extends IntersectionCounts {
  protected readonly accumulatedRowCounts: number[] = [];
  protected readonly calculatePairs = new LazyProperty(
    (): CalculatePairs => {
      if (this.predictedConditionNegative.length === 0) {
        return new CalculatePairsNoNegative(this);
      } else if (this.predictedConditionNegative.length === 1) {
        return new CalculatePairs1Negative(this);
      } else {
        return new CalculatePairsManyNegative(this);
      }
    }
  );

  clusters(
    startAt = 0,
    limit: number = Number.POSITIVE_INFINITY
  ): (NodeID | undefined)[] {
    let clusterId = this.findCluster(startAt);
    const resultRows = [];
    while (this.hasCluster(clusterId) && limit > 0) {
      const [skipped, rows] = this.calculatePairs.value.at(
        clusterId,
        startAt,
        limit
      );
      resultRows.push(...rows);
      startAt -= skipped;
      limit -= rows.length;
      if (this.isUnknownCluster(clusterId)) {
        this.accumulatedRowCounts.push(
          this.numberKnownRows + skipped + rows.length
        );
      }
      clusterId++;
    }
    return resultRows;
  }

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

  protected hasCluster(clusterId: number): boolean {
    return this.positiveIntersection.clustering.numberClusters > clusterId;
  }
}

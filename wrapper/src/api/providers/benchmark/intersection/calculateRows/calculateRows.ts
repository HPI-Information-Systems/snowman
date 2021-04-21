import binarySearch from 'binary-search';

import { compareNumbers } from '../../../../tools/comparators';
import { LazyProperty } from '../../../../tools/lazyProperty';
import {
  IntersectionCache,
  IntersectionConfig,
} from '../../cache/flavors/intersectionCache';
import { ClusterID, NodeID } from '../../cluster/types';
import { IntersectionOnlyIncludes } from '../intersectionOnlyIncludes';
import { CalculateRowsFlavor } from './flavors/base';
import { CalculateRowsManyExcludes } from './flavors/manyExcludes';
import { CalculateRowsOneExclude } from './flavors/oneExclude';
import { CalculateRowsOnlyIncludes } from './flavors/onlyIncludes';

export class CalculateRows {
  /**
   * contains the number of rows from cluster 0 to cluster n
   * !uses cluster ids of the intersection with only the includes
   */
  protected readonly accumulatedRowCounts: number[] = [];
  protected readonly calculateRows = new LazyProperty(
    (): CalculateRowsFlavor => {
      if (this.config.excluded.length === 0) {
        return new CalculateRowsOnlyIncludes(this.config);
      } else if (this.config.excluded.length === 1) {
        return new CalculateRowsOneExclude(this.config);
      } else {
        return new CalculateRowsManyExcludes(this.config);
      }
    }
  );
  protected readonly numberClusters = new LazyProperty(
    () =>
      (IntersectionCache.get({
        datasetId: this.config.datasetId,
        included: this.config.included,
        excluded: [],
      }) as IntersectionOnlyIncludes).clustering.numberClusters
  );

  constructor(protected readonly config: IntersectionConfig) {}

  rows(
    startAt = 0,
    limit: number = Number.POSITIVE_INFINITY
  ): (NodeID | undefined)[] {
    limit = limit === -1 ? Number.POSITIVE_INFINITY : limit;
    let clusterId = this.findCluster(startAt);
    if (clusterId > 0) {
      startAt -= this.accumulatedRowCounts[clusterId - 1];
    }
    const resultRows = [];
    while (this.hasCluster(clusterId) && limit > 0) {
      const [skipped, rows] = this.calculateRows.value.at(
        clusterId,
        startAt,
        limit
      );
      resultRows.push(...rows);
      startAt -= skipped;
      limit -= rows.length;
      if (this.isUnknownCluster(clusterId) && limit > 0) {
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
    return this.numberClusters.value > clusterId;
  }
}

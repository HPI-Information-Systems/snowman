import binarySearch from 'binary-search';

import { ExperimentId } from '../../../../server/types';
import { compareNumbers } from '../../../../tools/comparators';
import { LazyProperty } from '../../../../tools/lazyProperty';
import { Subclustering } from '../helper/cluster/subclustering';
import { Clustering } from '../helper/cluster/types';
import { UnionFind } from '../helper/cluster/unionFind';
import { datasetFromExperimentIds } from '../helper/datasetFromExperiments';
import { numberOfPairs } from '../helper/evaluator/util';
import { IntersectionCache } from './cache';
import { IntersectionQueries } from './queries';

export class Intersection {
  get clustering(): Clustering {
    return this._clustering.value;
  }
  get pairCount(): number {
    return this._pairCount.value;
  }
  get rowCount(): number {
    return this._rowCount.value;
  }

  records(startAt = 0, limit = this.rowCount) {
    let startIndex = binarySearch(
      this.accumulatedRowCounts,
      startAt,
      compareNumbers
    );
    // TODO
    if (startIndex < 0) {
      startIndex = ~startIndex;
    } else {
    }
  }

  protected readonly _clustering = new LazyProperty<Clustering>(() =>
    this.createClustering()
  );
  protected readonly _pairCount = new LazyProperty<number>(() =>
    this.calculatePairCount()
  );
  protected readonly _rowCount = new LazyProperty<number>(() =>
    this.calculateRowCount()
  );

  protected accumulatedRowCounts: number[] = [];

  protected readonly queries = new IntersectionQueries();

  constructor(
    protected readonly predictedConditionPositive: ExperimentId[],
    protected readonly predictedConditionNegative: ExperimentId[]
  ) {}

  protected createClustering(): Clustering {
    if (this.predictedConditionNegative.length > 0) {
      throw new Error(
        'Creating a clustering which excludes experiments is not supported.'
      );
    } else if (this.predictedConditionPositive.length === 0) {
      throw new Error(
        'Creating a clustering containing no experiments is not supported.'
      );
    } else if (this.predictedConditionPositive.length === 1) {
      return new UnionFind(
        datasetFromExperimentIds(
          this.predictedConditionPositive
        ).numberOfRecords
      ).link(this.queries.experimentLinks(this.predictedConditionPositive[0]));
    } else {
      return new Subclustering(
        IntersectionCache.get(
          this.predictedConditionPositive.slice(0, 1),
          []
        ).clustering,
        IntersectionCache.get(
          this.predictedConditionPositive.slice(1),
          []
        ).clustering
      );
    }
  }

  protected calculatePairCount(): number {
    if (this.predictedConditionNegative.length === 0) {
      let pairCount = 0;
      for (const cluster of this.clustering.clusters()) {
        pairCount += numberOfPairs(cluster.length);
      }
      return pairCount;
    } else {
      // |A without B without C without D ...| = |A| - |A intersected B|  - |A without B intersected C| - |A without B without C intersected D| - ...
      let pairCount = IntersectionCache.get(this.predictedConditionPositive, [])
        .pairCount;
      for (
        let index = 0;
        index < this.predictedConditionNegative.length;
        ++index
      ) {
        pairCount -= IntersectionCache.get(
          [
            ...this.predictedConditionPositive,
            this.predictedConditionNegative[index],
          ],
          this.predictedConditionNegative.slice(0, index)
        ).pairCount;
      }
      return pairCount;
    }
  }

  protected calculateRowCount(): number {
    if (this.predictedConditionNegative.length === 0) {
      let rowCount = 0;
      let clusterCount = 0;
      for (const cluster of this.clustering.clusters()) {
        if (cluster.length > 1) {
          rowCount += cluster.length;
          ++clusterCount;
        }
      }
      return rowCount + clusterCount - 1;
    } else {
      return this.pairCount * 2 + this.pairCount - 1;
    }
  }
}

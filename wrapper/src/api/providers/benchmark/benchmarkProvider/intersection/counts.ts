import { LazyProperty } from '../../../../tools/lazyProperty';
import { numberOfPairs } from '../../../../tools/numberOfPairs';
import { IntersectionBase } from './base';
import { IntersectionCache } from './cache';

export class IntersectionCounts extends IntersectionBase {
  get pairCount(): number {
    return this._pairCount.value;
  }
  get rowCount(): number {
    return this._rowCount.value;
  }

  protected readonly _pairCount = new LazyProperty<number>(() =>
    this.calculatePairCount()
  );
  protected readonly _rowCount = new LazyProperty<number>(() =>
    this.calculateRowCount()
  );

  protected calculatePairCount(): number {
    if (this.predictedConditionNegative.length === 0) {
      let pairCount = 0;
      for (const cluster of this.clustering.clusters()) {
        pairCount += numberOfPairs(cluster.length);
      }
      return pairCount;
    } else {
      // |A without B without C without D ...| = |A| - |A intersected B|  - |A without B intersected C| - |A without B without C intersected D| - ...
      let pairCount = this.positiveIntersection.pairCount;
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

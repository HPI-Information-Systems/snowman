import { LazyProperty } from '../../../tools/lazyProperty';
import { numberOfPairs } from '../../../tools/numberOfPairs';
import { IntersectionBase } from './base';
import { IntersectionCache } from './cache';

export class IntersectionCounts extends IntersectionBase {
  get numberPairs(): number {
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
      let numberPairs = 0;
      for (const cluster of this.clustering.clusters()) {
        numberPairs += numberOfPairs(cluster.length);
      }
      return numberPairs;
    } else {
      // |A without B without C without D ...| = |A| - |A intersected B|  - |A without B intersected C| - |A without B without C intersected D| - ...
      let numberPairs = this.positiveIntersection.numberPairs;
      for (
        let index = 0;
        index < this.predictedConditionNegative.length;
        ++index
      ) {
        numberPairs -= IntersectionCache.get(
          [
            ...this.predictedConditionPositive,
            this.predictedConditionNegative[index],
          ],
          this.predictedConditionNegative.slice(0, index),
          this.datasetId,
          [
            ...this.positiveSimilarityThresholds,
            this.negativeSimilarityThresholds[index],
          ],
          [
            ...this.positiveSimilarityFunctions,
            this.negativeSimilarityFunctions[index],
          ],
          this.negativeSimilarityThresholds.slice(0, index),
          this.negativeSimilarityFunctions.slice(0, index)
        ).numberPairs;
      }
      return numberPairs;
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
      return rowCount + Math.max(0, clusterCount - 1);
    } else {
      return this.numberPairs * 2 + Math.max(0, this.numberPairs - 1);
    }
  }
}

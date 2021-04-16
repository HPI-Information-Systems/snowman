import { tables } from '../../../database';
import { LazyProperty } from '../../../tools/lazyProperty';
import { numberOfPairs } from '../../../tools/numberOfPairs';
import { IntersectionBase } from './base';
import { IntersectionCache } from './cache';

function toString(value: unknown): string {
  return `${value}`;
}

export class IntersectionCounts extends IntersectionBase {
  get numberPairs(): number {
    return this._pairCount.value;
  }
  get rowCount(): number {
    return this._rowCount.value;
  }

  protected readonly _pairCount = new LazyProperty<number>(
    () =>
      this.getCachedPairCount() ??
      this.cachePairCount(this.calculatePairCount())
  );
  protected readonly _rowCount = new LazyProperty<number>(
    () =>
      this.getCachedRowCount() ?? this.cacheRowCount(this.calculateRowCount())
  );

  protected get pairsCacheKey(): string {
    return this._cacheKey.value + '-pairs';
  }

  protected get rowsCacheKey(): string {
    return this._cacheKey.value + '-rows';
  }

  protected readonly _cacheKey = new LazyProperty<string>(() =>
    (([
      this.datasetId,
      this.positive,
      this.positiveSimilarityThresholds,
      this.positiveSimilarityFunctions,
      this.negative,
      this.negativeSimilarityThresholds,
      this.negativeSimilarityFunctions,
    ] as ConstructorParameters<typeof IntersectionBase>) as (
      | number
      | undefined
    )[][])
      .map((ids) => ids.map(toString).join(';'))
      .join('/')
  );

  protected getCachedPairCount(): number | undefined {
    return tables.cache.intersectionCounts.get({ key: this.pairsCacheKey })
      ?.value;
  }

  protected getCachedRowCount(): number | undefined {
    return tables.cache.intersectionCounts.get({ key: this.rowsCacheKey })
      ?.value;
  }

  protected cachePairCount(pairCount: number): number {
    tables.cache.intersectionCounts.upsert([
      { key: this.pairsCacheKey, value: pairCount },
    ]);
    return pairCount;
  }

  protected cacheRowCount(rowCount: number): number {
    tables.cache.intersectionCounts.upsert([
      { key: this.rowsCacheKey, value: rowCount },
    ]);
    return rowCount;
  }

  protected calculatePairCount(): number {
    if (this.negative.length === 0) {
      return this.clustering.numberPairs;
    } else {
      // |A without B without C without D ...| = |A| - |A intersected B|  - |A without B intersected C| - |A without B without C intersected D| - ...
      let numberPairs = this.positiveIntersection.numberPairs;
      for (let index = 0; index < this.negative.length; ++index) {
        numberPairs -= IntersectionCache.get(
          this.datasetId,
          [...this.positive, this.negative[index]],
          [
            ...this.positiveSimilarityThresholds,
            this.negativeSimilarityThresholds[index],
          ],
          [
            ...this.positiveSimilarityFunctions,
            this.negativeSimilarityFunctions[index],
          ],
          this.negative.slice(0, index),
          this.negativeSimilarityThresholds.slice(0, index),
          this.negativeSimilarityFunctions.slice(0, index)
        ).numberPairs;
      }
      return numberPairs;
    }
  }

  protected calculateRowCount(): number {
    if (this.negative.length === 0) {
      return this.clustering.numberRows;
    } else {
      return this.numberPairs * 2 + Math.max(0, this.numberPairs - 1);
    }
  }
}

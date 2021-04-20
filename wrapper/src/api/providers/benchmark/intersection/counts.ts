import { tables } from '../../../database';
import { LazyProperty } from '../../../tools/lazyProperty';
import { IntersectionBase } from './base';
import { IntersectionCache } from './intersectionCache';

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
    return this.key + '-pairs';
  }

  protected get rowsCacheKey(): string {
    return this.key + '-rows';
  }

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
    if (this.config.excluded.length === 0) {
      return this.clustering.numberPairs;
    } else {
      // |A without B without C without D ...| = |A| - |A intersected B|  - |A without B intersected C| - |A without B without C intersected D| - ...
      let numberPairs = this.positiveIntersection.numberPairs;
      for (let index = 0; index < this.config.excluded.length; ++index) {
        numberPairs -= IntersectionCache.get({
          datasetId: this.config.datasetId,
          included: [...this.config.included, this.config.excluded[index]],
          excluded: this.config.excluded.slice(0, index),
        }).numberPairs;
      }
      return numberPairs;
    }
  }

  protected calculateRowCount(): number {
    if (this.config.excluded.length === 0) {
      return this.clustering.numberRows;
    } else {
      return this.numberPairs * 2 + Math.max(0, this.numberPairs - 1);
    }
  }
}

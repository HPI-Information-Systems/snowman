import { LazyProperty } from '../../../tools/lazyProperty';
import { IntersectionCache } from '../cache/flavors/intersectionCache';
import { IntersectionBase } from './intersectionBase';

export class IntersectionWithExcludes extends IntersectionBase {
  protected _numberPairs = new LazyProperty(() => this.calculateNumberPairs());
  get numberPairs(): number {
    return this._numberPairs.value;
  }

  protected _numberRows = new LazyProperty(() => this.calculateNumberRows());
  get numberRows(): number {
    return this._numberRows.value;
  }

  protected calculateNumberPairs(): number {
    // |A without B without C without D ...| = |A| - |A intersected B|  - |A without B intersected C| - |A without B without C intersected D| - ...
    let numberPairs = IntersectionCache.get({
      datasetId: this.config.datasetId,
      included: this.config.included,
      excluded: [],
      forceStatic: this.config.forceStatic,
    }).numberPairs;
    for (let index = 0; index < this.config.excluded.length; ++index) {
      numberPairs -= IntersectionCache.get({
        datasetId: this.config.datasetId,
        included: [...this.config.included, this.config.excluded[index]],
        excluded: this.config.excluded.slice(0, index),
        forceStatic: this.config.forceStatic,
      }).numberPairs;
    }
    return numberPairs;
  }

  protected calculateNumberRows(): number {
    return Math.max(0, this.numberPairs * 3 - 1);
  }
}

import { LazyProperty } from '../../../tools/lazyProperty';
import { IntersectionCache } from '../cache/flavors/intersectionCache';
import { Subclustering } from '../cluster/subclustering';
import { IntersectionOnlyIncludes } from '../intersection/intersectionOnlyIncludes';
import { CacheableSubclustingBase } from './cacheableSubclusteringBase';

export class CacheableSubclusting extends CacheableSubclustingBase {
  protected readonly _clustering = new LazyProperty(
    () =>
      new Subclustering(
        (IntersectionCache.get({
          datasetId: this.config.datasetId,
          included: this.config.base,
          excluded: [],
        }) as IntersectionOnlyIncludes).clustering,
        (IntersectionCache.get({
          datasetId: this.config.datasetId,
          included: this.config.partition,
          excluded: [],
        }) as IntersectionOnlyIncludes).clustering
      )
  );
  get clustering(): Subclustering {
    return this._clustering.value;
  }
}

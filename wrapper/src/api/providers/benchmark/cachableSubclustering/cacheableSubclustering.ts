import { tables } from '../../../database';
import { LazyProperty } from '../../../tools/lazyProperty';
import { StoredDataset } from '../../dataset/util/converter';
import { BenchmarkCacheContent } from '../cache';
import { SubclusteringConfig } from '../cache';
import { IntersectionCache } from '../cache/flavors/intersectionCache';
import { Subclustering } from '../cluster/subclustering';
import { IntersectionOnlyIncludes } from '../intersection/intersectionOnlyIncludes';

export class CacheableSubclusting
  implements BenchmarkCacheContent<SubclusteringConfig> {
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

  readonly dataset: StoredDataset & { numberOfRecords: number };

  get size(): number {
    return this.dataset.numberOfRecords;
  }

  constructor(readonly config: SubclusteringConfig, readonly key: string) {
    const dataset = tables.meta.dataset.get({ id: config.datasetId });
    if (!dataset || dataset.numberOfRecords === undefined) {
      throw new Error('Dataset must have number of records.');
    }
    this.dataset = dataset as this['dataset'];
  }

  access(config: SubclusteringConfig): void {
    return;
  }

  get clustering(): Subclustering {
    return this._clustering.value;
  }
}

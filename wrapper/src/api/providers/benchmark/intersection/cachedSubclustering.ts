import { tables } from '../../../database';
import { LazyProperty } from '../../../tools/lazyProperty';
import { StoredDataset } from '../../dataset/util/converter';
import { Subclustering } from '../cluster/subclustering';
import { IntersectionCache } from './cache';
import { IntersectionCacheContent, SubclusteringConfig } from './cache';

export class CachedSubclusting
  implements IntersectionCacheContent<SubclusteringConfig> {
  protected readonly _clustering = new LazyProperty(
    () =>
      new Subclustering(
        IntersectionCache.get({
          datasetId: this.config.datasetId,
          included: this.config.base,
          excluded: [],
        }).clustering,
        IntersectionCache.get({
          datasetId: this.config.datasetId,
          included: this.config.partition,
          excluded: [],
        }).clustering
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

  get clustering(): Subclustering {
    return this._clustering.value;
  }
}

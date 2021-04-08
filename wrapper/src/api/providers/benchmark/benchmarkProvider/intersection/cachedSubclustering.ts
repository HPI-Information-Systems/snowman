import { DatasetId, ExperimentId } from '../../../../server/types';
import { LazyProperty } from '../../../../tools/lazyProperty';
import { Subclustering } from '../cluster/subclustering';
import { IntersectionCache } from './cache';

export class CachedSubclusting {
  protected readonly _clustering = new LazyProperty(
    () =>
      new Subclustering(
        IntersectionCache.get(this.base, [], this.datasetId).clustering,
        IntersectionCache.get(this.partition, [], this.datasetId).clustering
      )
  );
  constructor(
    protected readonly base: ExperimentId[],
    protected readonly partition: ExperimentId[],
    protected readonly datasetId: [DatasetId]
  ) {}

  get clustering(): Subclustering {
    return this._clustering.value;
  }
}

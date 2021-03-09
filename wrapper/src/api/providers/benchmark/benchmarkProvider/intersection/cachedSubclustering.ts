import { ExperimentId } from '../../../../server/types';
import { LazyProperty } from '../../../../tools/lazyProperty';
import { Subclustering } from '../cluster/subclustering';
import { IntersectionCache } from './cache';

export class CachedSubclusting {
  protected readonly _clustering = new LazyProperty(
    () =>
      new Subclustering(
        IntersectionCache.get(this.base, []).clustering,
        IntersectionCache.get(this.partition, []).clustering
      )
  );
  constructor(
    protected readonly base: ExperimentId[],
    protected readonly partition: ExperimentId[]
  ) {}

  get clustering(): Subclustering {
    return this._clustering.value;
  }
}

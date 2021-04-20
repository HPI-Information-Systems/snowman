import { tables } from '../../../database';
import { LazyProperty } from '../../../tools/lazyProperty';
import { StoredDataset } from '../../dataset/util/converter';
import { BenchmarkCacheContent } from '../cache';
import { SubclusterCache } from '../cache';
import {
  IntersectionCache,
  IntersectionConfig,
} from '../cache/flavors/intersectionCache';
import { Clustering } from '../cluster/types';
import { UnionFind } from '../cluster/unionFind';
import type { Intersection as IntersectionSubclass } from '.';
import { IntersectionQueries } from './queries';

export class IntersectionBase
  implements BenchmarkCacheContent<IntersectionConfig> {
  get clustering(): Clustering {
    return this._clustering.value;
  }

  get size(): number {
    return this.dataset.numberOfRecords;
  }

  protected readonly _clustering = new LazyProperty<Clustering>(() =>
    this.createClustering()
  );

  dangerousOverwriteClustering(clustering: Clustering): void {
    this._clustering.value = clustering;
  }

  readonly dataset: StoredDataset & { numberOfRecords: number };
  protected readonly queries = new IntersectionQueries();

  constructor(readonly config: IntersectionConfig, readonly key: string) {
    const dataset = tables.meta.dataset.get({ id: config.datasetId });
    if (!dataset || typeof dataset.numberOfRecords !== 'number') {
      throw new Error('The dataset does not specify number of records.');
    }
    this.dataset = dataset as this['dataset'];
  }

  get positiveIntersection(): IntersectionSubclass {
    return IntersectionCache.get({
      datasetId: this.config.datasetId,
      included: this.config.included,
      excluded: [],
    });
  }

  get negativeIntersection(): IntersectionSubclass {
    return IntersectionCache.get({
      datasetId: this.config.datasetId,
      included: this.config.excluded,
      excluded: [],
    });
  }

  protected createClustering(): Clustering {
    if (this.config.excluded.length > 0) {
      throw new Error(
        'Creating a clustering which excludes experiments is not supported.'
      );
    }
    if (this.config.included.length === 0) {
      const clustering = new UnionFind(this.size);
      for (let index = 1; index < this.size; index++) {
        clustering.link([[index, index - 1]]);
      }
      return clustering;
    } else if (this.config.included.length === 1) {
      return new UnionFind(this.size).link(
        this.queries.experimentLinks(
          this.config.included[0].experimentId,
          this.config.included[0].similarity
        )
      );
    } else {
      const splitIndex = Math.floor(this.config.included.length / 2);
      return SubclusterCache.get({
        datasetId: this.config.datasetId,
        base: this.config.included.slice(0, splitIndex),
        partition: this.config.included.slice(splitIndex),
      }).clustering;
    }
  }
}

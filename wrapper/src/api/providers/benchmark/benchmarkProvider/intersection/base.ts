import { ExperimentId } from '../../../../server/types';
import { LazyProperty } from '../../../../tools/lazyProperty';
import { Clustering } from '../helper/cluster/types';
import { UnionFind } from '../helper/cluster/unionFind';
import { datasetFromExperimentIds } from '../helper/datasetFromExperiments';
import type { Intersection as IntersectionSubclass } from '.';
import { IntersectionCache, SubclusterCache } from './cache';
import { IntersectionQueries } from './queries';

export class IntersectionBase {
  get clustering(): Clustering {
    return this._clustering.value;
  }

  protected readonly _clustering = new LazyProperty<Clustering>(() =>
    this.createClustering()
  );

  protected readonly queries = new IntersectionQueries();

  constructor(
    public readonly predictedConditionPositive: ExperimentId[],
    public readonly predictedConditionNegative: ExperimentId[]
  ) {}

  get positiveIntersection(): IntersectionSubclass {
    return IntersectionCache.get(this.predictedConditionPositive, []);
  }

  get negativeIntersection(): IntersectionSubclass {
    return IntersectionCache.get(this.predictedConditionNegative, []);
  }

  protected createClustering(): Clustering {
    if (this.predictedConditionNegative.length > 0) {
      throw new Error(
        'Creating a clustering which excludes experiments is not supported.'
      );
    } else if (this.predictedConditionPositive.length === 0) {
      throw new Error(
        'Creating a clustering containing no experiments is not supported.'
      );
    } else if (this.predictedConditionPositive.length === 1) {
      return new UnionFind(
        datasetFromExperimentIds(
          this.predictedConditionPositive
        ).numberOfRecords
      ).link(this.queries.experimentLinks(this.predictedConditionPositive[0]));
    } else {
      const splitIndex = Math.floor(this.predictedConditionPositive.length / 2);
      return SubclusterCache.get(
        this.predictedConditionPositive.slice(0, splitIndex),
        this.predictedConditionPositive.slice(splitIndex)
      ).clustering;
    }
  }
}

import { ExperimentId } from '../../../../server/types';
import { LazyProperty } from '../../../../tools/lazyProperty';
import { Subclustering } from '../helper/cluster/subclustering';
import { Clustering } from '../helper/cluster/types';
import { UnionFind } from '../helper/cluster/unionFind';
import { datasetFromExperimentIds } from '../helper/datasetFromExperiments';
import { IntersectionCache } from './cache';
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
    protected readonly predictedConditionPositive: ExperimentId[],
    protected readonly predictedConditionNegative: ExperimentId[]
  ) {}

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
      return new Subclustering(
        IntersectionCache.get(
          this.predictedConditionPositive.slice(0, 1),
          []
        ).clustering,
        IntersectionCache.get(
          this.predictedConditionPositive.slice(1),
          []
        ).clustering
      );
    }
  }
}

import {
  DatasetId,
  ExperimentId,
  SimilarityThresholdFunctionId,
} from '../../../server/types';
import { LazyProperty } from '../../../tools/lazyProperty';
import { Subclustering } from '../cluster/subclustering';
import { IntersectionCache } from './cache';

export class CachedSubclusting {
  protected readonly _clustering = new LazyProperty(
    () =>
      new Subclustering(
        IntersectionCache.get(
          this.base,
          [],
          this.datasetId,
          this.baseSimilarityThresholds,
          this.baseSimilarityFunctions,
          [],
          []
        ).clustering,
        IntersectionCache.get(
          this.partition,
          [],
          this.datasetId,
          this.partitionSimilarityThresholds,
          this.partitionSimilarityFunctions,
          [],
          []
        ).clustering
      )
  );
  constructor(
    protected readonly base: ExperimentId[],
    protected readonly partition: ExperimentId[],
    protected readonly datasetId: [DatasetId],
    protected readonly baseSimilarityThresholds: (number | undefined)[],
    protected readonly baseSimilarityFunctions: (
      | SimilarityThresholdFunctionId
      | undefined
    )[],
    protected readonly partitionSimilarityThresholds: (number | undefined)[],
    protected readonly partitionSimilarityFunctions: (
      | SimilarityThresholdFunctionId
      | undefined
    )[]
  ) {}

  get clustering(): Subclustering {
    return this._clustering.value;
  }
}

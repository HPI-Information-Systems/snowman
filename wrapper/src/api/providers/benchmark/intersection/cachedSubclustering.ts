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
          this.datasetId,
          this.base,
          this.baseSimilarityThresholds,
          this.baseSimilarityFunctions,
          [],
          [],
          []
        ).clustering,
        IntersectionCache.get(
          this.datasetId,
          this.partition,
          this.partitionSimilarityThresholds,
          this.partitionSimilarityFunctions,
          [],
          [],
          []
        ).clustering
      )
  );
  constructor(
    protected readonly datasetId: [DatasetId],
    protected readonly base: ExperimentId[],
    protected readonly baseSimilarityThresholds: (number | undefined)[],
    protected readonly baseSimilarityFunctions: (
      | SimilarityThresholdFunctionId
      | undefined
    )[],
    protected readonly partition: ExperimentId[],
    protected readonly partitionSimilarityThresholds: (number | undefined)[],
    protected readonly partitionSimilarityFunctions: (
      | SimilarityThresholdFunctionId
      | undefined
    )[]
  ) {}

  static entangledConstructorParameters = [
    {
      sortBy: 1,
      toSort: [1, 2, 3],
    },
    {
      sortBy: 4,
      toSort: [4, 5, 6],
    },
  ];

  get clustering(): Subclustering {
    return this._clustering.value;
  }
}

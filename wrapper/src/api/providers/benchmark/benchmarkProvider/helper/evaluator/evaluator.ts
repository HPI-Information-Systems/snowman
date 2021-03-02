import { ExperimentIntersectionMode } from '../../../../../server/types';
import { LazyProperty } from '../../../../../tools/lazyProperty';
import { Subclustering } from '../cluster/subclustering';
import {
  Clustering,
  Subclustering as SubclusteringSpec,
} from '../cluster/types';
import {
  calculateConfusionMatrixCounts,
  calculateConfusionMatrixTuples,
  ConfusionMatrixCounts,
  ConfusionMatrixTuples,
} from './confusionMatrix';

export class Evaluator {
  protected goldSubclustering: LazyProperty<SubclusteringSpec>;
  protected experimentSubclustering: LazyProperty<SubclusteringSpec>;

  constructor(goldstandard: Clustering, experiment: Clustering) {
    this.goldSubclustering = new LazyProperty(
      () => new Subclustering(goldstandard, experiment)
    );
    this.experimentSubclustering = new LazyProperty(
      () => new Subclustering(experiment, goldstandard)
    );
    this._confusionMatrixCounts = new LazyProperty(() =>
      calculateConfusionMatrixCounts(
        this.goldSubclustering.value,
        this.experimentSubclustering.value
      )
    );
  }

  protected _confusionMatrixCounts: LazyProperty<ConfusionMatrixCounts>;
  get confusionMatrixCounts(): ConfusionMatrixCounts {
    return this._confusionMatrixCounts.value;
  }

  protected _confusionMatrixTuples = new Map<
    ExperimentIntersectionMode,
    ConfusionMatrixTuples
  >();
  confusionMatrixTuples(
    mode: ExperimentIntersectionMode
  ): ConfusionMatrixTuples {
    let tuples = this._confusionMatrixTuples.get(mode);
    if (!tuples) {
      tuples = calculateConfusionMatrixTuples(
        this.goldSubclustering.value,
        this.experimentSubclustering.value,
        mode
      );
      this._confusionMatrixTuples.set(mode, tuples);
    }
    return tuples;
  }
}

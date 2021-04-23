import { LazyProperty } from '../../../tools/lazyProperty';
import { BenchmarkCacheContent } from '../cache';
import { ConfusionMatrixConfig } from '../cache/flavors/confusionMatrixCache';
import { IntersectionCache } from '../cache/flavors/intersectionCache';
import { ConfusionMatrix } from '../metrics/confusionMatrix';

export class CacheableConfusionMatrix
  implements BenchmarkCacheContent<ConfusionMatrixConfig> {
  size = 1;

  protected readonly _confusionMatrix = new LazyProperty(() =>
    this.calculateConfusionMatrix()
  );
  get confusionMatrix(): ConfusionMatrix {
    return this._confusionMatrix.value;
  }

  constructor(public config: ConfusionMatrixConfig) {}

  access(config: ConfusionMatrixConfig): void {
    this.config = config;
  }

  protected calculateConfusionMatrix(): ConfusionMatrix {
    return {
      truePositives: IntersectionCache.get({
        datasetId: this.config.datasetId,
        excluded: [],
        included: [...this.config.groundTruth, ...this.config.predicted],
      }).numberPairs,
      falsePositives: IntersectionCache.get({
        datasetId: this.config.datasetId,
        excluded: [...this.config.groundTruth],
        included: [...this.config.predicted],
      }).numberPairs,
      falseNegatives: IntersectionCache.get({
        datasetId: this.config.datasetId,
        excluded: [...this.config.predicted],
        included: [...this.config.groundTruth],
      }).numberPairs,
      trueNegatives: IntersectionCache.get({
        datasetId: this.config.datasetId,
        excluded: [...this.config.groundTruth, ...this.config.predicted],
        included: [],
      }).numberPairs,
    };
  }
}

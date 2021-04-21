import { LazyProperty } from '../../../tools/lazyProperty';
import { BenchmarkCacheContent } from '../cache';
import { ConfusionMatrixConfig } from '../cache/flavors/confusionMatrixCache';
import {
  calculateConfusionMatrix,
  ConfusionMatrix,
} from '../metrics/confusionMatrix';

export class CacheableConfusionMatrix
  implements BenchmarkCacheContent<ConfusionMatrixConfig> {
  size = 1;

  protected readonly _confusionMatrix = new LazyProperty(() =>
    calculateConfusionMatrix(this.config)
  );
  get confusionMatrix(): ConfusionMatrix {
    return this._confusionMatrix.value;
  }

  constructor(public config: ConfusionMatrixConfig) {}

  access(config: ConfusionMatrixConfig): void {
    this.config = config;
  }
}

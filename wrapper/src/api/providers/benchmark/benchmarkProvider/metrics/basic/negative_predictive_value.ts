import { BaseMetric } from '../base';

export class NegativePredictiveValue extends BaseMetric {
  name = 'negative predictive value';
  range: [number, number] = [0, 1];
  description = '\\frac{trueNegatives}{trueNegatives + falseNegatives}';
  get value(): number {
    return (
      this.matrix.trueNegatives /
      (this.matrix.trueNegatives + this.matrix.falseNegatives)
    );
  }
}

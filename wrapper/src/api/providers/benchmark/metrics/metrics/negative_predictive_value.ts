import { BaseMetric } from '../base';

export class NegativePredictiveValue extends BaseMetric {
  name = 'negative predictive value';
  static range: [number, number] = [0, 1];
  formula = '\\frac{tn}{fp+tn}';
  get value(): number {
    return (
      this.matrix.trueNegatives /
      (this.matrix.trueNegatives + this.matrix.falseNegatives)
    );
  }
}

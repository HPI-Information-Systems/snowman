import { BaseMetric } from '../base';

export class Specificity extends BaseMetric {
  name = 'specificity';
  static range: [number, number] = [0, 1];
  formula = '\\frac{tn}{fp+tn}';
  get value(): number {
    return (
      this.matrix.trueNegatives /
      (this.matrix.trueNegatives + this.matrix.falsePositives)
    );
  }
}

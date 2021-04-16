import { BaseMetric } from '../base';

export class Specificity extends BaseMetric {
  name = 'specificity';
  range: [number, number] = [0, 1];
  formula = '\\frac{trueNegatives}{trueNegatives + falsePositives}';
  get value(): number {
    return (
      this.matrix.trueNegatives /
      (this.matrix.trueNegatives + this.matrix.falsePositives)
    );
  }
}

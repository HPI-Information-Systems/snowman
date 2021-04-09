import { BaseMetric } from '../base';

export class FalseNegativeRate extends BaseMetric {
  name = 'false negative rate';
  range: [number, number] = [0, 1];
  formula = '\\frac{falseNegatives}{falseNegatives + truePositives}';
  get value(): number {
    return (
      this.matrix.falseNegatives /
      (this.matrix.falseNegatives + this.matrix.truePositives)
    );
  }
}

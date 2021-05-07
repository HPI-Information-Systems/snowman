import { BaseMetric } from '../base';

export class FalseNegativeRate extends BaseMetric {
  name = 'false negative rate';
  range: [number, number] = [0, 1];
  formula = '\\frac{fn}{tp+fn}';
  get value(): number {
    return (
      this.matrix.falseNegatives /
      (this.matrix.falseNegatives + this.matrix.truePositives)
    );
  }
}

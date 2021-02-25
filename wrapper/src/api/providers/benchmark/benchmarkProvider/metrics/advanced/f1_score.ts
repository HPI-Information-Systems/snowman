import { BaseMetric } from '../base';

export class F1Score extends BaseMetric {
  name = 'f1 score';
  range: [number, number] = [0, 1];
  description = '2 * \\frac{precision * recall}{precision + recall}';
  get value(): number {
    return (
      (2 * this.matrix.truePositives) /
      (2 * this.matrix.truePositives +
        this.matrix.falsePositives +
        this.matrix.falseNegatives)
    );
  }
}

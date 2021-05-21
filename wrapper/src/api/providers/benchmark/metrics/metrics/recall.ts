import { BaseMetric } from '../base';

export class Recall extends BaseMetric {
  name = 'recall';
  static range: [number, number] = [0, 1];
  formula = '\\frac{tp}{tp+fn}';
  get value(): number {
    return (
      this.matrix.truePositives /
      (this.matrix.truePositives + this.matrix.falseNegatives)
    );
  }
}

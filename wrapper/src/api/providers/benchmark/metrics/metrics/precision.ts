import { BaseMetric } from '../base';

export class Precision extends BaseMetric {
  name = 'precision';
  range: [number, number] = [0, 1];
  formula = '\\frac{tp}{tp+fp}';
  get value(): number {
    return (
      this.matrix.truePositives /
      (this.matrix.truePositives + this.matrix.falsePositives)
    );
  }
}

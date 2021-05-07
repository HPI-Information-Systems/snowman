import { BaseMetric } from '../base';

export class FalsePositiveRate extends BaseMetric {
  name = 'false positive rate';
  range: [number, number] = [0, 1];
  formula = '\\frac{fp}{fp + tn}';
  get value(): number {
    return (
      this.matrix.falsePositives /
      (this.matrix.falsePositives + this.matrix.trueNegatives)
    );
  }
}

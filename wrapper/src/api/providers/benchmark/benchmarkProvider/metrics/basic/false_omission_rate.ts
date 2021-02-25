import { BaseMetric } from '../base';

export class FalseOmissionRate extends BaseMetric {
  name = 'false omission rate';
  range: [number, number] = [0, 1];
  description = '\\frac{falseNegatives}{trueNegatives + falseNegatives}';
  get value(): number {
    return (
      this.matrix.falseNegatives /
      (this.matrix.trueNegatives + this.matrix.falseNegatives)
    );
  }
}

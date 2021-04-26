import { BaseMetric } from '../base';

export class FalseOmissionRate extends BaseMetric {
  name = 'false omission rate';
  range: [number, number] = [0, 1];
  formula = '\\frac{fn}{fn+tn}';
  get value(): number {
    return (
      this.matrix.falseNegatives /
      (this.matrix.trueNegatives + this.matrix.falseNegatives)
    );
  }
}

import { BaseMetric } from '../base';

export class MatthewsCorrelationCoefficient extends BaseMetric {
  name = 'matthews correlation coeff.';
  range: [number, number] = [0, 1];
  formula =
    '\\frac{TP * TN - FP * FN}{\\sqrt{(TP + FP) * (TP + FN) * (TN + FP) * (TN + FN)}}';

  get value(): number {
    return (
      (this.matrix.truePositives * this.matrix.trueNegatives -
        this.matrix.falsePositives * this.matrix.falseNegatives) /
      Math.sqrt(
        (this.matrix.truePositives + this.matrix.falsePositives) *
          (this.matrix.truePositives + this.matrix.falseNegatives) *
          (this.matrix.trueNegatives + this.matrix.falsePositives) *
          (this.matrix.trueNegatives + this.matrix.falseNegatives)
      )
    );
  }
}

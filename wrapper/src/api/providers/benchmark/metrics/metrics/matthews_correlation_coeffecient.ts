import { BaseMetric } from '../base';

export class MatthewsCorrelationCoefficient extends BaseMetric {
  name = 'matthews correlation coeff.';
  static range: [number, number] = [0, 1];
  formula =
    '\\frac{tp \\cdot tn - fp \\cdot fn}{\\sqrt{(tp + fp) \\cdot (tp + fn) \\cdot (fp + tn) \\cdot (fn + tn)}}';

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

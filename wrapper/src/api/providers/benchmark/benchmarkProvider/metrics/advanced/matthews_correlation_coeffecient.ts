import { BaseMetric } from '../base';

export class MatthewsCorrelationCoefficient extends BaseMetric {
  name = 'matthews correlation coefficient';
  range: [number, number] = [0, 1];
  description =
    '$truePositives * trueNegatives - falsePositives * falseNegatives\\sqrt{(truePositives+falsePositives) * (truePositives+falseNegatives)*(trueNegatives + falsePositives)+(trueNegatives*falseNegatives)}$';

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

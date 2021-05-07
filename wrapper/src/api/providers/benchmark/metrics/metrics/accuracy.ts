import { BaseMetric } from '../base';

export class Accuracy extends BaseMetric {
  name = 'accuracy';
  formula = '\\frac{tp+tn}{tp+fp+fn+tn}';
  range: [number, number] = [0, 1];
  get value(): number {
    return (
      (this.matrix.truePositives + this.matrix.trueNegatives) /
      (this.matrix.truePositives +
        this.matrix.trueNegatives +
        this.matrix.falsePositives +
        this.matrix.falseNegatives)
    );
  }
}

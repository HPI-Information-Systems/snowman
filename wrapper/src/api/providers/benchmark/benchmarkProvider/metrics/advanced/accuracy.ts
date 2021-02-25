import { BaseMetric } from '../base';

export class Accuracy extends BaseMetric {
  name = 'accuracy';
  formula = '\\frac{TPos + TNeg}{TPos + TNeg + FPos + FNeg}';
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

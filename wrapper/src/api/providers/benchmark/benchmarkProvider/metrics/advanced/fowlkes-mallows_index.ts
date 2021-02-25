import { BaseMetric } from '../base';

export class FowlkesMallowsIndex extends BaseMetric {
  name = 'fowlkes mallows index';
  range: [number, number] = [0, 1];
  description =
    '\\sqrt{\\frac{TruePos}{TruePos + FalsePos} * \\frac{TruePos}{TruePos + FalseNeg}}';
  get value(): number {
    return Math.sqrt(
      (this.matrix.truePositives /
        (this.matrix.truePositives + this.matrix.falsePositives)) *
        (this.matrix.truePositives /
          (this.matrix.truePositives + this.matrix.falseNegatives))
    );
  }
}

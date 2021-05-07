import { BaseMetric } from '../base';

export class FowlkesMallowsIndex extends BaseMetric {
  name = 'fowlkes mallows index';
  range: [number, number] = [0, 1];
  formula = '\\sqrt{\\frac{tp}{tp + fp} \\cdot \\frac{tp}{tp + fn}}';
  get value(): number {
    return Math.sqrt(
      (this.matrix.truePositives /
        (this.matrix.truePositives + this.matrix.falsePositives)) *
        (this.matrix.truePositives /
          (this.matrix.truePositives + this.matrix.falseNegatives))
    );
  }
}

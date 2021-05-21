import { BaseMetric } from '../base';

export class FalseDiscoveryRate extends BaseMetric {
  name = 'false discovery rate';
  static range: [number, number] = [0, 1];
  formula = '\\frac{fp}{tp + fp}';
  get value(): number {
    return (
      this.matrix.falsePositives /
      (this.matrix.truePositives + this.matrix.falsePositives)
    );
  }
}

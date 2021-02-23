import { BaseMetric } from '../base';

export class FalseDiscoveryRate extends BaseMetric {
  name = 'false discovery rate';
  range: [number, number] = [0, 1];
  description = '$falsePositives / (truePositives + falsePositives)$';
  get value(): number {
    return (
      this.matrix.falsePositives /
      (this.matrix.truePositives + this.matrix.falsePositives)
    );
  }
}

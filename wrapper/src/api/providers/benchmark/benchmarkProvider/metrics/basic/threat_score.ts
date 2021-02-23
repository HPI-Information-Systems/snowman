import { BaseMetric } from '../base';

export class ThreatScore extends BaseMetric {
  name = 'threat score';
  range: [number, number] = [0, 1];
  description =
    '$truePositives / (truePositives + falseNegatives + falsePositives)$';
  get value(): number {
    return (
      this.matrix.truePositives /
      (this.matrix.truePositives +
        this.matrix.falseNegatives +
        this.matrix.falsePositives)
    );
  }
}

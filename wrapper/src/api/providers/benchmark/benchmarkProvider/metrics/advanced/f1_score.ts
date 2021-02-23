import { BaseMetric } from '../base';

export class FMeasure extends BaseMetric {
  name = 'f1 score';
  range: [number, number] = [0, 1];
  description =
    '$(2*truePositives)/ (2*truePositives + falsePositives + falseNegatives)$';
  get value(): number {
    return (
      (2 * this.matrix.truePositives) /
      (2 * this.matrix.truePositives +
        this.matrix.falsePositives +
        this.matrix.falseNegatives)
    );
  }
}

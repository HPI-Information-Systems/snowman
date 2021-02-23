import { BaseMetric } from '../base';

export class Recall extends BaseMetric {
  name = 'recall';
  range: [number, number] = [0, 1];
  description = '$truePositives / (truePositives + falseNegatives)$';
  get value(): number {
    return (
      this.matrix.truePositives /
      (this.matrix.truePositives + this.matrix.falseNegatives)
    );
  }
}

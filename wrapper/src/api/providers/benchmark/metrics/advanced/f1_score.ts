import { BaseMetric } from '../base';

export class F1Score extends BaseMetric {
  name = 'f1 score';
  range: [number, number] = [0, 1];
  formula = '2 * \\frac{precision * recall}{precision + recall}';
  info =
    'The meaningfulness of the f1 score is debated in the research community.';
  infoLink = 'https://link.springer.com/article/10.1007/s11222-017-9746-6';
  get value(): number {
    return (
      (2 * this.matrix.truePositives) /
      (2 * this.matrix.truePositives +
        this.matrix.falsePositives +
        this.matrix.falseNegatives)
    );
  }
}

import { BaseMetric } from '../base';
import { F1Score } from './f1_score';

export class FStarScore extends BaseMetric {
  name = 'f* score';
  static range: [number, number] = [0, 1];
  formula = '\\frac{f1\\:score}{2 - f1\\:score}';
  info =
    'The F*-Score has been proposed as an alternative to the F1-Score because it is debated in research community.';
  infoLink = 'https://link.springer.com/article/10.1007/s10994-021-05964-1';
  get value(): number {
    const f1Score = new F1Score(this.matrix).value;
    return f1Score / (2 - f1Score);
  }
}

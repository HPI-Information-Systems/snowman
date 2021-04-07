import { BaseMetric } from '../base';
import { F1Score } from './f1_score';

export class FStarScore extends BaseMetric {
  name = 'F* score';
  range: [number, number] = [0, 1];
  formula = '\\frac{F1-Score}{2 - F1-Score}';
  info =
    'The F*-Score has been proposed as an alternative to the F1-Score because it is debated in research community.';
  infoLink = 'https://link.springer.com/article/10.1007/s10994-021-05964-1';
  get value(): number {
    return (
      new F1Score(this.matrix).value / (2 - new F1Score(this.matrix).value)
    );
  }
}

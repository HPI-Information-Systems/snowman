import { BaseMetric } from '../base';
import { Recall } from '../basic/recall';
import { Specificity } from '../basic/specificity';

export class BookmakerInformedness extends BaseMetric {
  name = 'bookmaker informedness';
  range: [number, number] = [0, 1];
  description = 'TruePosRate + TrueNegRate - 1';
  get value(): number {
    const truePositiveRate = new Recall(this.matrix).value;
    const trueNegativeRate = new Specificity(this.matrix).value;
    return truePositiveRate + trueNegativeRate - 1;
  }
}

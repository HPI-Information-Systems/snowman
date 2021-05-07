import { BaseMetric } from '../base';
import { Recall } from '../metrics/recall';
import { Specificity } from '../metrics/specificity';

export class BookmakerInformedness extends BaseMetric {
  name = 'bookmaker informedness';
  range: [number, number] = [0, 1];
  formula = 'true\\:positive\\:rate + true\\:negative\\:rate - 1';
  get value(): number {
    const truePositiveRate = new Recall(this.matrix).value;
    const trueNegativeRate = new Specificity(this.matrix).value;
    return truePositiveRate + trueNegativeRate - 1;
  }
}

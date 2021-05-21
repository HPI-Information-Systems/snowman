import { BaseMetric } from '../base';
import { Recall } from '../metrics/recall';
import { Specificity } from '../metrics/specificity';

export class BalancedAccuracy extends BaseMetric {
  name = 'balanced accuracy';
  static range: [number, number] = [0, 1];
  formula = '\\frac{true\\:positive\\:rate + true\\:negative\\:rate}{2}';
  get value(): number {
    const truePositiveRate = new Recall(this.matrix).value;
    const trueNegativeRate = new Specificity(this.matrix).value;
    return (truePositiveRate + trueNegativeRate) / 2;
  }
}

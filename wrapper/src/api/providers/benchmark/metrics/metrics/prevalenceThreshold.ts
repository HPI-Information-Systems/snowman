import { BaseMetric } from '../base';
import { Recall } from './recall';
import { Specificity } from './specificity';

export class PrevalenceThreshold extends BaseMetric {
  name = 'prevalence threshold';
  static range: [number, number] = [0, 1];
  formula =
    '\\frac{\\sqrt{true\\:positive\\:rate \\cdot (1 - true\\:negative\\:rate)} + true\\:negative\\:rate - 1}{true\\:positive\\:rate + true\\:negative\\:rate - 1}';
  get value(): number {
    const truePositiveRate = new Recall(this.matrix).value;
    const trueNegativeRate = new Specificity(this.matrix).value;

    return (
      (Math.sqrt(truePositiveRate * (-trueNegativeRate + 1)) +
        trueNegativeRate -
        1) /
      (truePositiveRate + trueNegativeRate - 1)
    );
  }
}

import { BaseMetric } from '../base';
import { Recall } from '../basic/recall';
import { Specificity } from '../basic/specificity';

export class BalancedAccuracy extends BaseMetric {
  name = 'balanced accuracy';
  range: [number, number] = [0, 1];
  description = '$(truePositiveRate + trueNegativeRate) / 2$';
  get value(): number {
    const truePositiveRate = new Recall(this.matrix).value;
    const trueNegativeRate = new Specificity(this.matrix).value;
    return (truePositiveRate + trueNegativeRate) / 2;
  }
}

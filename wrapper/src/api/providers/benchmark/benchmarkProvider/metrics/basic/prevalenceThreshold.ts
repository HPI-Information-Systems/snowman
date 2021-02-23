import { BaseMetric } from '../base';
import { Recall } from './recall';
import { Specificity } from './specificity';

export class PrevalenceThreshold extends BaseMetric {
  name = 'prevalence threshold';
  range: [number, number] = [0, 1];
  description =
    '$\\sqrt{truePositiveRate*(- trueNegativeRate + 1)} + trueNegativeRate - 1 / (truePositiveRate + trueNegativeRate - 1)$';
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

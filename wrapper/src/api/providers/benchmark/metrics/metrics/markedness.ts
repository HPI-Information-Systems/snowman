import { BaseMetric } from '../base';
import { NegativePredictiveValue } from '../metrics/negative_predictive_value';
import { Precision } from '../metrics/precision';

export class Markedness extends BaseMetric {
  name = 'markedness';
  range: [number, number] = [0, 1];
  formula = 'precision + negative\\:predictive\\:value - 1';
  get value(): number {
    const ppv = new Precision(this.matrix).value;
    const npv = new NegativePredictiveValue(this.matrix).value;
    return ppv + npv - 1;
  }
}

import { BaseEffort } from '../baseEffort';

export class HRAmountWeightedEffort extends BaseEffort {
  name = 'HR-amount weighted effort';
  formula = '$$e^{HR-Amount} * \\frac_{expertise}{100}$$';
  get value(): number {
    return (Math.exp(this.hrAmount) * this.expertise) / 100;
  }
}

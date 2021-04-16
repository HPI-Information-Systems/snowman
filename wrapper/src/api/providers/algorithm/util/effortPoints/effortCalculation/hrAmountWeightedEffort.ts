import { BaseEffort } from '../baseEffort';

export class HRAmountWeightedEffort extends BaseEffort {
  name = 'HR-amount weighted effort';
  range: [number, number] = [0, this.expertise + this.hrAmount];
  formula = '$$e^{HR-Amount} * \\frac_{expertise}{100}$$';
  get value(): number {
    return (Math.exp(this.hrAmount) * this.expertise) / 100;
  }
}

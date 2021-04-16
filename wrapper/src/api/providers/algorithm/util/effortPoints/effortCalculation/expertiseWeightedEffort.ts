import { BaseEffort } from '../baseEffort';

export class ExpertiseWeightedEffort extends BaseEffort {
  name = 'expertise weighted effort';
  range: [number, number] = [0, this.expertise + this.hrAmount];
  formula = '$$e^{\\frac_{expertise}{100}} * HR-Amount$$';
  get value(): number {
    return Math.exp(this.expertise / 100) * this.hrAmount;
  }
}

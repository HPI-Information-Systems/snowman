import { BaseEffort } from '../baseEffort';

export class ExpertiseWeightedEffort extends BaseEffort {
  name = 'expertise weighted effort';
  id = 'expertiseWeightedEffort';
  formula = '$$e^{\\frac_{expertise}{100}} * HR-Amount$$';
  get value(): number {
    return Math.exp(this.expertise / 100) * this.hrAmount;
  }
}

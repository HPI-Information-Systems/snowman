import { BaseEffort } from '../baseEffort';

export class LogarithmicEffort extends BaseEffort {
  name = 'logarithmic expertise level';
  range: [number, number] = [0, this.expertise + this.hrAmount];
  formula = '$$log(expertise level) * HR-Amount$$';
  get value(): number {
    return Math.log(this.expertise) * this.hrAmount;
  }
}

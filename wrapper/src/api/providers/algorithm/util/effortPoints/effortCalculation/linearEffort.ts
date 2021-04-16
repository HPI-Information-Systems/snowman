import { BaseEffort } from '../baseEffort';

export class LinearEffort extends BaseEffort {
  name = 'linear effort';
  range: [number, number] = [0, this.expertise + this.hrAmount];
  formula = '$$expertise level * HR-Amount$$';
  get value(): number {
    return this.expertise * this.hrAmount;
  }
}

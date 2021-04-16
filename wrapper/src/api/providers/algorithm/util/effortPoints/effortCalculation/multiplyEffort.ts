import { BaseEffort } from '../baseEffort';

export class MultiplyEffort extends BaseEffort {
  name = 'simple multiplied effort';
  range: [number, number] = [0, 1]; //TODO: change
  formula = '$$expertise level * HR-Amount$$';
  get value(): number {
    return this.expertise * this.hrAmount;
  }
}

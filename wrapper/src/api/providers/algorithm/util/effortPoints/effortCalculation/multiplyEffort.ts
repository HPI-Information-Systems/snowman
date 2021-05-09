import { BaseEffort } from '../baseEffort';

export class MultiplyEffort extends BaseEffort {
  name = 'simple multiplied effort';
  id = 'multiplyEffort';
  formula = '$$expertise level * HR-Amount$$';
  get value(): number {
    return this.expertise * this.hrAmount;
  }
}

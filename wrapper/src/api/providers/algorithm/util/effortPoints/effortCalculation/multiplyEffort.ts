import { BaseEffort } from '../baseEffort';

export class MultiplyEffort extends BaseEffort {
  name = 'multiply effort';
  range: [number, number] = [0, 1]; //TODO: change
  formula = '$$expertise level * HR-Amount$$';
  get value(): number {
    return 5;
    //return this.expertise * this.hrAmount;
  }
}

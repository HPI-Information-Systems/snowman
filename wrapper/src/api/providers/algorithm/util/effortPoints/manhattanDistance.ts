import { BaseEffort } from './baseEffort';

export class ManhattanDistance extends BaseEffort {
  name = 'manhattan distance';
  range: [number, number] = [0, this.expertise + this.hrAmount];
  formula = '\\sum_{i}|a_i - b_i|';
  get value(): number {
    const origin = [0, 0];
    return (
      Math.abs(origin[0] - this.hrAmount) + Math.abs(origin[1] - this.expertise)
    );
  }
}

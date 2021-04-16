import { BaseEffort } from '../baseEffort';
// Manhattan Effort Point Estimation
export class ManhattanDistance extends BaseEffort {
  name = 'manhattan distance-based effort';
  formula = '\\sum_{i}|a_i - b_i|';
  get value(): number {
    const origin = [0, 0];
    return (
      Math.abs(origin[0] - this.hrAmount) + Math.abs(origin[1] - this.expertise)
    );
  }
}

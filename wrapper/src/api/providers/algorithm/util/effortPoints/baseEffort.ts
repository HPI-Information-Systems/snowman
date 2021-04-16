import { Metric } from '../../../../server/types';
import { LinearEffort, LogarithmicEffort, ManhattanDistance } from './';
export abstract class BaseEffort implements Metric {
  constructor(
    protected readonly expertise: number,
    protected readonly hrAmount: number
  ) {}

  abstract name: string;
  abstract range: [number, number];
  abstract formula: string;
  abstract value: number;

  info?: string;
  infoLink?: string;
}

export function calculateEffort(expertise: number, hrAmount: number): Metric[] {
  const efforts = [ManhattanDistance, LogarithmicEffort, LinearEffort];
  return efforts
    .map((Effort) => new Effort(expertise, hrAmount))
    .map(({ value, formula, name, range, info, infoLink }) => {
      return {
        value,
        formula,
        name,
        range,
        info,
        infoLink,
      };
    });
}

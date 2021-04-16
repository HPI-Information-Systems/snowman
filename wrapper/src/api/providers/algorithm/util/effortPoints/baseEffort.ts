import { Metric } from '../../../../server/types';

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

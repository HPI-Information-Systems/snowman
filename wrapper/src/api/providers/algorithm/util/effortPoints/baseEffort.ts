import { Metric } from '../../../../server/types';

export abstract class BaseEffort implements Metric {
  constructor(
    protected readonly expertise: number,
    protected readonly hrAmount: number
  ) {}

  abstract id: string;
  abstract formula: string;
  abstract name: string;
  abstract value: number;

  info?: string;
  infoLink?: string;
}

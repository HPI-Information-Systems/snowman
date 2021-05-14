import { Metric } from '../../../server/types';
import { ConfusionMatrix } from './confusionMatrix';

export abstract class BaseMetric implements Metric {
  constructor(protected readonly matrix: ConfusionMatrix) {}

  abstract name: string;
  static range: [number, number];
  abstract formula: string;
  abstract value: number;

  info?: string;
  infoLink?: string;
}

import { Metric } from '../../../../server/types';
import { ConfusionMatrixCounts } from '../helper/evaluator/confusionMatrix';

export abstract class BaseMetric implements Metric {
  constructor(protected readonly matrix: ConfusionMatrixCounts) {}

  abstract name: string;
  abstract range: [number, number];
  abstract formula: string;
  abstract value: number;

  info?: string;
  infoLink?: string;
}

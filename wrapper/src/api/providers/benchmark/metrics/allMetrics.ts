import { InstantiableAbstractClass } from '../../../tools/types';
import {
  Accuracy,
  BalancedAccuracy,
  BookmakerInformedness,
  F1Score,
  FalseDiscoveryRate,
  FalseNegativeRate,
  FalseOmissionRate,
  FalsePositiveRate,
  FowlkesMallowsIndex,
  FStarScore,
  Markedness,
  MatthewsCorrelationCoefficient,
  NegativePredictiveValue,
  Precision,
  PrevalenceThreshold,
  Recall,
  Specificity,
  ThreatScore,
} from '.';
import { BaseMetric } from './base';

export const metrics = [
  Accuracy,
  Precision,
  Recall,
  F1Score,
  FStarScore,

  FalsePositiveRate,
  FalseNegativeRate,
  FalseDiscoveryRate,
  FalseOmissionRate,
  NegativePredictiveValue,
  Specificity,

  BalancedAccuracy,
  BookmakerInformedness,
  FowlkesMallowsIndex,
  Markedness,
  MatthewsCorrelationCoefficient,
  PrevalenceThreshold,
  ThreatScore,
];

export const metricsMap = new Map(
  metrics.map(
    (metric) =>
      [metric.name, metric] as [
        string,
        InstantiableAbstractClass<typeof BaseMetric>
      ]
  )
);

import { InstantiableAbstractClass } from 'snowman-library';

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

const metricsWithoutTrueNegatives = [
  Precision,
  Recall,
  F1Score,
  FStarScore,
  FalseNegativeRate,
  FalseDiscoveryRate,
  FowlkesMallowsIndex,
  ThreatScore,
];

const metricsWithTrueNegatives = [
  Accuracy,
  FalsePositiveRate,
  FalseOmissionRate,
  NegativePredictiveValue,
  Specificity,
  BalancedAccuracy,
  BookmakerInformedness,
  Markedness,
  MatthewsCorrelationCoefficient,
  PrevalenceThreshold,
];

export const metrics = [
  ...metricsWithoutTrueNegatives,
  ...metricsWithTrueNegatives,
];

export const metricsMap = new Map(
  metrics.map(
    (metric) =>
      [metric.name.charAt(0).toLowerCase() + metric.name.slice(1), metric] as [
        string,
        InstantiableAbstractClass<typeof BaseMetric>
      ]
  )
);

import { Metric } from 'api';
import {
  DecisionRowAlgorithm,
  DecisionSegmentEntity,
} from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/types/DecisionEntities';

export const InitialEffort: DecisionRowAlgorithm[] = [
  {
    title: 'Matching Solution Type',
    selector: (anEntity) =>
      anEntity.softKPIs?.integrationEffort?.solutionType?.join(', ') ?? '?',
  },
  {
    title: 'Use Case',
    selector: (anEntity) =>
      anEntity.softKPIs?.integrationEffort?.useCase?.join(', ') ?? '?',
  },
  {
    title: 'General Costs',
    selector: (anEntity) =>
      anEntity.softKPIs?.integrationEffort?.generalCosts?.toString() ?? '?',
  },
  {
    title: 'Installation Time',
    selector: (anEntity) =>
      (anEntity.softKPIs?.integrationEffort?.deploymentType?.join(', ') ??
        '?') + ' h',
  },
  {
    title: 'Installation Effort',
    selector: (anEntity) =>
      (anEntity.installationEffort
        ?.find(
          (anEffort: Metric): boolean =>
            anEffort.id === 'manhattanDistanceBasedEffort'
        )
        ?.value.toString() ?? '?') + ' EP',
  },
  {
    title: 'Expertise',
    inset: true,
    selector: (anEntity) =>
      (anEntity.softKPIs?.integrationEffort?.installationEffort?.expertise?.toString() ??
        '?') + ' %',
  },
  {
    title: 'HR Amount',
    inset: true,
    selector: (anEntity) =>
      anEntity.softKPIs?.integrationEffort?.installationEffort?.hrAmount?.toString() ??
      '?',
  },
];

export const ContinuousEffort: DecisionRowAlgorithm[] = [
  {
    title: 'Matching Solution Effort',
    selector: (anEntity) =>
      (anEntity.matchingSolutionEffort
        ?.find(
          (anEffort: Metric): boolean =>
            anEffort.id === 'manhattanDistanceBasedEffort'
        )
        ?.value.toString() ?? '?') + ' EP',
  },
  {
    title: 'Expertise',
    inset: true,
    selector: (anEntity) =>
      (anEntity.softKPIs?.configurationEffort?.matchingSolution?.expertise?.toString() ??
        '?') + ' %',
  },
  {
    title: 'HR Amount',
    inset: true,
    selector: (anEntity) =>
      anEntity.softKPIs?.configurationEffort?.matchingSolution?.hrAmount?.toString() ??
      '?',
  },
  {
    title: 'Domain Effort',
    selector: (anEntity) =>
      (anEntity.domainEffort
        ?.find(
          (anEffort: Metric): boolean =>
            anEffort.id === 'manhattanDistanceBasedEffort'
        )
        ?.value.toString() ?? '?') + ' EP',
  },
  {
    title: 'Expertise',
    inset: true,
    selector: (anEntity) =>
      (anEntity.softKPIs?.configurationEffort?.domain?.expertise?.toString() ??
        '?') + ' %',
  },
  {
    title: 'HR Amount',
    inset: true,
    selector: (anEntity) =>
      anEntity.softKPIs?.configurationEffort?.domain?.hrAmount?.toString() ??
      '?',
  },
  {
    title: 'Interfaces',
    selector: (anEntity) =>
      anEntity.softKPIs?.configurationEffort?.interfaces?.join(', ') ?? '?',
  },
  {
    title: 'Supported OS',
    selector: (anEntity) =>
      anEntity.softKPIs?.configurationEffort?.supportedOSs?.join(', ') ?? '?',
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DecisionSegments: DecisionSegmentEntity<any>[] = [
  {
    title: 'Initial Effort',
    children: InitialEffort,
  },
  {
    title: 'Continuous Effort',
    children: ContinuousEffort,
  },
  {
    title: 'Average Metrics',
    children: [],
  },
];

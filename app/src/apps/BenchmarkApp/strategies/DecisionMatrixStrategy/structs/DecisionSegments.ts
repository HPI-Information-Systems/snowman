import { Metric } from 'api';
import {
  DecisionRowAlgorithm,
  DecisionSegmentEntity,
} from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/types/DecisionEntities';
import { ExpansionTypes } from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/types/ExpansionTypes';

const TooltipEffortPointsManhattanDistance =
  'Effort points (EP) are calculated based upon the unweighted Manhattan distance of both base values.';

export const IntegrationExpenditures: DecisionRowAlgorithm[] = [
  {
    title: 'General Costs',
    selector: (anEntity) =>
      (anEntity.softKPIs?.integrationEffort?.generalCosts?.toString() ?? '?') +
      ' €',
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
    doesExpand: ExpansionTypes.InstallationEffort,
    tooltip: TooltipEffortPointsManhattanDistance,
  },
  {
    title: 'Expertise',
    inset: true,
    selector: (anEntity) =>
      (anEntity.softKPIs?.integrationEffort?.installationEffort?.expertise?.toString() ??
        '?') + ' %',
    expandedBy: ExpansionTypes.InstallationEffort,
  },
  {
    title: 'HR Amount',
    inset: true,
    selector: (anEntity) =>
      (anEntity.softKPIs?.integrationEffort?.installationEffort?.hrAmount?.toString() ??
        '?') + ' man-hr',
    expandedBy: ExpansionTypes.InstallationEffort,
  },
];

export const ConfigurationExpenditures: DecisionRowAlgorithm[] = [
  {
    title: 'Matching Solution Effort',
    selector: (anEntity) =>
      (anEntity.matchingSolutionEffort
        ?.find(
          (anEffort: Metric): boolean =>
            anEffort.id === 'manhattanDistanceBasedEffort'
        )
        ?.value.toString() ?? '?') + ' EP',
    doesExpand: ExpansionTypes.MatchingSolutionEffort,
    tooltip: TooltipEffortPointsManhattanDistance,
  },
  {
    title: 'Expertise',
    inset: true,
    selector: (anEntity) =>
      (anEntity.softKPIs?.configurationEffort?.matchingSolution?.expertise?.toString() ??
        '?') + ' %',
    expandedBy: ExpansionTypes.MatchingSolutionEffort,
  },
  {
    title: 'HR Amount',
    inset: true,
    selector: (anEntity) =>
      (anEntity.softKPIs?.configurationEffort?.matchingSolution?.hrAmount?.toString() ??
        '?') + ' man-hr',
    expandedBy: ExpansionTypes.MatchingSolutionEffort,
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
    doesExpand: ExpansionTypes.DomainEffort,
    tooltip: TooltipEffortPointsManhattanDistance,
  },
  {
    title: 'Expertise',
    inset: true,
    selector: (anEntity) =>
      (anEntity.softKPIs?.configurationEffort?.domain?.expertise?.toString() ??
        '?') + ' %',
    expandedBy: ExpansionTypes.DomainEffort,
  },
  {
    title: 'HR Amount',
    inset: true,
    selector: (anEntity) =>
      (anEntity.softKPIs?.configurationEffort?.domain?.hrAmount?.toString() ??
        '?') + ' man-hr',
    expandedBy: ExpansionTypes.DomainEffort,
  },
];

const CategoricalSoftKPIs: DecisionRowAlgorithm[] = [
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
    title: 'Deployment Type',
    selector: (anEntity) =>
      anEntity.softKPIs?.integrationEffort?.deploymentType?.join(', ') ?? '?',
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
    title: 'Integration Expenditures',
    children: IntegrationExpenditures,
  },
  {
    title: 'Configuration Expenditures',
    children: ConfigurationExpenditures,
  },
  {
    title: 'Categorical Soft KPIs',
    children: CategoricalSoftKPIs,
  },
  {
    title: 'Macro Average Metrics',
    children: [],
  },
];

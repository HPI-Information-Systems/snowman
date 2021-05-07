import {
  Algorithm,
  DiagramExperimentItem,
  SoftKPIsAlgorithmEnum,
} from '../../../server/types';
import { AlgorithmProvider } from '../../algorithm/algorithmProvider';
import { ExperimentProvider } from '../../experiment/experimentProvider';
import { DiagramDataProvider } from './diagramDataProvider';

export class DiagramAlgorithmSoftKPIsDataProvider extends DiagramDataProvider {
  getData(
    metric: SoftKPIsAlgorithmEnum,
    diagramExperimentItem: DiagramExperimentItem
  ): number {
    const algorithmProvider = new AlgorithmProvider();
    const experimentProvider = new ExperimentProvider();
    const algorithm = algorithmProvider.getAlgorithm(
      experimentProvider.getExperiment(
        diagramExperimentItem.experiment.experimentId
      ).algorithmId
    );

    return this.mapEnum(metric, algorithm);
  }

  mapEnum(metric: SoftKPIsAlgorithmEnum, algorithm: Algorithm): number {
    const mappedMetric = softKPIAlgorithmMap.get(metric);
    if (mappedMetric) {
      const metricValue = mappedMetric(algorithm);
      if (!metricValue) {
        throw new Error(`The metric ${metric} does not exist!`);
      }
      return metricValue;
    }
    throw new Error(`The metric ${metric} does not exist!`);
  }
}

const softKPIAlgorithmMap: Map<
  SoftKPIsAlgorithmEnum,
  (algorithm: Algorithm) => number | undefined
> = new Map([
  [
    SoftKPIsAlgorithmEnum.DomainExpertise,
    (algorithm: Algorithm) =>
      algorithm.softKPIs?.configurationEffort?.domain?.expertise ?? undefined,
  ],
  [
    SoftKPIsAlgorithmEnum.DomainHrAmount,
    (algorithm: Algorithm) =>
      algorithm.softKPIs?.configurationEffort?.domain?.hrAmount ?? undefined,
  ],
  [
    SoftKPIsAlgorithmEnum.InstallationExpertise,
    (algorithm: Algorithm) =>
      algorithm.softKPIs?.integrationEffort?.installationEffort?.expertise ??
      undefined,
  ],
  [
    SoftKPIsAlgorithmEnum.InstallationHrAmount,
    (algorithm: Algorithm) =>
      algorithm.softKPIs?.integrationEffort?.installationEffort?.hrAmount ??
      undefined,
  ],
  [
    SoftKPIsAlgorithmEnum.GeneralCosts,
    (algorithm: Algorithm) =>
      algorithm.softKPIs?.integrationEffort?.generalCosts ?? undefined,
  ],
  [
    SoftKPIsAlgorithmEnum.MatchingSolutionExpertise,
    (algorithm: Algorithm) =>
      algorithm.softKPIs?.configurationEffort?.matchingSolution?.expertise ??
      undefined,
  ],
  [
    SoftKPIsAlgorithmEnum.MatchingSolutionHrAmount,
    (algorithm: Algorithm) =>
      algorithm.softKPIs?.configurationEffort?.matchingSolution?.hrAmount ??
      undefined,
  ],
  [
    SoftKPIsAlgorithmEnum.DomainExpertiseWeightedEffort,
    (algorithm: Algorithm) => {
      return algorithm.domainEffort?.find(
        ({ id }) => id === 'expertiseWeightedEffort'
      )?.value;
    },
  ],
  [
    SoftKPIsAlgorithmEnum.DomainHrAmountWeightedEffort,
    (algorithm: Algorithm) => {
      return algorithm.domainEffort?.find(
        ({ id }) => id === 'hrAmountWeightedEffort'
      )?.value;
    },
  ],
  [
    SoftKPIsAlgorithmEnum.DomainManhattanDistanceBasedEffort,
    (algorithm: Algorithm) => {
      return algorithm.domainEffort?.find(
        ({ id }) => id === 'manhattanDistanceBasedEffort'
      )?.value;
    },
  ],
  [
    SoftKPIsAlgorithmEnum.DomainMultiplyEffort,
    (algorithm: Algorithm) => {
      return algorithm.domainEffort?.find(({ id }) => id === 'multiplyEffort')
        ?.value;
    },
  ],
  [
    SoftKPIsAlgorithmEnum.MatchingSolutionExpertiseWeightedEffort,
    (algorithm: Algorithm) => {
      return algorithm.matchingSolutionEffort?.find(
        ({ id }) => id === 'expertiseWeightedEffort'
      )?.value;
    },
  ],
  [
    SoftKPIsAlgorithmEnum.MatchingSolutionHrAmountWeightedEffort,
    (algorithm: Algorithm) => {
      return algorithm.matchingSolutionEffort?.find(
        ({ id }) => id === 'hrAmountWeightedEffort'
      )?.value;
    },
  ],
  [
    SoftKPIsAlgorithmEnum.MatchingSolutionManhattanDistanceBasedEffort,
    (algorithm: Algorithm) => {
      return algorithm.matchingSolutionEffort?.find(
        ({ id }) => id === 'manhattanDistanceBasedEffort'
      )?.value;
    },
  ],
  [
    SoftKPIsAlgorithmEnum.MatchingSolutionMultiplyEffort,
    (algorithm: Algorithm) => {
      return algorithm.matchingSolutionEffort?.find(
        ({ id }) => id === 'multiplyEffort'
      )?.value;
    },
  ],
  [
    SoftKPIsAlgorithmEnum.InstallationExpertiseWeightedEffort,
    (algorithm: Algorithm) => {
      return algorithm.installationEffort?.find(
        ({ id }) => id === 'expertiseWeightedEffort'
      )?.value;
    },
  ],
  [
    SoftKPIsAlgorithmEnum.InstallationHrAmountWeightedEffort,
    (algorithm: Algorithm) => {
      return algorithm.installationEffort?.find(
        ({ id }) => id === 'hrAmountWeightedEffort'
      )?.value;
    },
  ],
  [
    SoftKPIsAlgorithmEnum.InstallationManhattanDistanceBasedEffort,
    (algorithm: Algorithm) => {
      return algorithm.installationEffort?.find(
        ({ id }) => id === 'manhattanDistanceBasedEffort'
      )?.value;
    },
  ],
  [
    SoftKPIsAlgorithmEnum.InstallationMultiplyEffort,
    (algorithm: Algorithm) => {
      return algorithm.installationEffort?.find(
        ({ id }) => id === 'multiplyEffort'
      )?.value;
    },
  ],
]);

import {
  Algorithm,
  DiagramExperimentItem,
  SoftKPIsAlgorithmEnum,
} from '../../../server/types';
import { AlgorithmProvider } from '../../algorithm/algorithmProvider';
import { DiagramDataProvider } from './diagramDataProvider';

export class DiagramAlgorithmSoftKPIsDataProvider extends DiagramDataProvider {
  getData(
    metric: SoftKPIsAlgorithmEnum,
    diagramExperimentItem: DiagramExperimentItem
  ): number {
    const algorithmProvider = new AlgorithmProvider();
    const algorithm = algorithmProvider.getAlgorithm(
      diagramExperimentItem.experiment.experimentId
    );

    return this.mapEnum(metric, algorithm);
  }

  mapEnum(metric: SoftKPIsAlgorithmEnum, algorithm: Algorithm): number {
    const mappedMetric = softKPIAlgorithmMap.get(metric);
    if (mappedMetric) {
      if (mappedMetric(algorithm)) mappedMetric(algorithm);
      throw new Error(`The metric ${metric} does not exist!`);
    }

    let effort = algorithm.domainEffort?.find(
      ({ id }) => (id as SoftKPIsAlgorithmEnum) === metric
    )?.value;

    if (!effort) {
      effort = algorithm.matchingSolutionEffort?.find(
        ({ id }) => (id as SoftKPIsAlgorithmEnum) === metric
      )?.value;
      if (!effort)
        throw new Error(
          `Either HR-Amount or Expertise is missing for experiment ${algorithm.id} so that effort cannot be calculated`
        );
    }
    return effort;
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
    SoftKPIsAlgorithmEnum.GeneralCosts,
    (algorithm: Algorithm) =>
      algorithm.softKPIs?.integrationEffort?.generalCosts ?? undefined,
  ],
  [
    SoftKPIsAlgorithmEnum.IntegrationTime,
    (algorithm: Algorithm) =>
      algorithm.softKPIs?.integrationEffort?.integrationTime ?? undefined,
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
]);

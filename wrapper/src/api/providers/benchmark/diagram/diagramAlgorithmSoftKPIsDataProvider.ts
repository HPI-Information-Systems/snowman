import {
  Algorithm,
  DiagramExperimentItem,
  Experiment,
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
    const experimentProvider = new ExperimentProvider();
    const experiment = experimentProvider.getExperiment(
      diagramExperimentItem.experiment.experimentId
    );

    return this.mapEnum(metric, experiment);
  }

  mapEnum(metric: SoftKPIsAlgorithmEnum, experiment: Experiment): number {
    const algorithmProvider = new AlgorithmProvider();
    const algorithm = algorithmProvider.getAlgorithm(experiment.algorithmId);
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
          `Either HR-Amount or Expertise is missing for experiment ${experiment.id} so that effort cannot be calculated`
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

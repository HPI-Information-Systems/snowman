import {
  DiagramExperimentItem,
  Experiment,
  SoftKPIsExperimentEnum,
} from '../../../server/types';
import { ExperimentProvider } from '../../experiment/experimentProvider';
import { DiagramDataProvider } from './diagramDataProvider';

export class DiagramExperimentSoftKPIsDataProvider extends DiagramDataProvider {
  getData(
    metric: SoftKPIsExperimentEnum,
    diagramExperimentItem: DiagramExperimentItem
  ): number {
    const experimentProvider = new ExperimentProvider();
    const experiment = experimentProvider.getExperiment(
      diagramExperimentItem.experiment.experimentId
    );

    return this.mapEnum(metric, experiment);
  }
  getRange(metric: SoftKPIsExperimentEnum): [number, number] | undefined {
    return softKPIExperimentRangeMap.get(metric);
  }

  mapEnum(metric: SoftKPIsExperimentEnum, experiment: Experiment): number {
    const mappedMetric = softKPIExperimentMap.get(metric);
    if (mappedMetric) {
      const metricValue = mappedMetric(experiment);
      if (!metricValue) {
        throw new Error(`The metric ${metric} does not exist!`);
      }
      return metricValue;
    }

    const effort = experiment.effort?.find(
      ({ id }) => (id as SoftKPIsExperimentEnum) === metric
    )?.value;

    if (!effort)
      throw new Error(
        `Either HR-Amount or Expertise is missing for experiment ${experiment.id} so that effort cannot be calculated`
      );
    return effort;
  }
}

const softKPIExperimentMap: Map<
  SoftKPIsExperimentEnum,
  (experiment: Experiment) => number | undefined
> = new Map([
  [
    SoftKPIsExperimentEnum.Expertise,
    (experiment: Experiment) => experiment.softKPIs?.expertise ?? undefined,
  ],
  [
    SoftKPIsExperimentEnum.HrAmount,
    (experiment: Experiment) => experiment.softKPIs?.hrAmount ?? undefined,
  ],
]);

const softKPIExperimentRangeMap: Map<
  SoftKPIsExperimentEnum,
  [number, number] | undefined
> = new Map([
  [SoftKPIsExperimentEnum.Expertise, [0, 100]],
  [SoftKPIsExperimentEnum.HrAmount, undefined],
  [SoftKPIsExperimentEnum.ExpertiseWeightedEffort, undefined],
  [SoftKPIsExperimentEnum.HrAmountWeightedEffort, undefined],
  [SoftKPIsExperimentEnum.ManhattanDistanceBasedEffort, undefined],
  [SoftKPIsExperimentEnum.MultiplyEffort, undefined],
]);

import {
  DiagramExperimentItem,
  EffortParts,
  Experiment,
  SoftKPIsExperimentEnum,
} from '../../../server/types';
import { ExperimentProvider } from '../../experiment/experimentProvider';
import { DiagramDataProvider } from './diagramDataProvider';

export class DiagramSoftKPIsDataProvider extends DiagramDataProvider {
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

  mapEnum(metric: SoftKPIsExperimentEnum, experiment: Experiment): number {
    const mappedMetric = softKPIExperimentMap.get(metric);
    if (mappedMetric) {
      if (!experiment.softKPIs)
        throw new Error(
          `Metric ${metric} is not defined for experiment ${experiment.id}`
        );
      if (!experiment.softKPIs[mappedMetric])
        throw new Error(
          `Metric ${metric} is not defined for experiment ${experiment.id}`
        );
      return experiment.softKPIs[mappedMetric] ?? -1; //TODO ?????
    }

    const value = experiment.effort?.find(
      ({ id }) => (id as SoftKPIsExperimentEnum) === metric
    )?.value;

    if (!value)
      throw new Error(
        `Either HR-Amount or Expertise is missing for experiment ${experiment.id} so that effort cannot be calculated`
      );
    return value;
  }
}

const softKPIExperimentMap: Map<
  SoftKPIsExperimentEnum,
  keyof EffortParts
> = new Map([
  [SoftKPIsExperimentEnum.Expertise, 'expertise'],
  [SoftKPIsExperimentEnum.HrAmount, 'hrAmount'],
]);

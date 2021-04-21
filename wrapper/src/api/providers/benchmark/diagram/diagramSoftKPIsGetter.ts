import {
  DiagramExperimentItem,
  Experiment,
  SoftKPIsExperimentEnum,
} from '../../../server/types';
import { ExperimentProvider } from '../../experiment/experimentProvider';
import { DiagramDataGetter } from './diagramGetter';

export class DiagramSoftKPIsGetter extends DiagramDataGetter {
  getData(
    metric: SoftKPIsExperimentEnum,
    diagramExperimentItem: DiagramExperimentItem
  ): number {
    const experimentProvider = new ExperimentProvider();
    const experiment = experimentProvider.getExperiment(
      diagramExperimentItem.experiment!.experimentId //TODO change this
    );

    return this.mapEnum(metric, experiment);
  }

  mapEnum(metric: SoftKPIsExperimentEnum, experiment: Experiment): number {
    if (metric === SoftKPIsExperimentEnum.Expertise) {
      return experiment.softKPIs?.expertise ?? -1;
    }
    if (metric === SoftKPIsExperimentEnum.HrAmount) {
      return experiment.softKPIs?.hrAmount ?? -1;
    }
    return (
      experiment.effort?.find(
        (effort) => (effort.id as SoftKPIsExperimentEnum) === metric
      )?.value ?? -1
    );
  }
}

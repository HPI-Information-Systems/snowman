import {
  DiagramExperimentItem,
  MetricsEnum,
  SoftKPIsExperimentEnum,
} from '../../../server/types';

export abstract class DiagramDataGetter {
  abstract getData(
    metric: MetricsEnum | SoftKPIsExperimentEnum,
    experiment: DiagramExperimentItem
  ): number;
}

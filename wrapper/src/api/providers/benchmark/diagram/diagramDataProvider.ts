import {
  DiagramExperimentItem,
  MetricsEnum,
  SoftKPIsAlgorithmEnum,
  SoftKPIsExperimentEnum,
} from '../../../server/types';

export abstract class DiagramDataProvider {
  abstract getData(
    metric: MetricsEnum | SoftKPIsExperimentEnum | SoftKPIsAlgorithmEnum,
    experiment: DiagramExperimentItem
  ): number;
}

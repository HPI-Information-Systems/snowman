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
  abstract getRange(
    metric: MetricsEnum | SoftKPIsExperimentEnum | SoftKPIsAlgorithmEnum
  ): [number, number] | undefined;
}

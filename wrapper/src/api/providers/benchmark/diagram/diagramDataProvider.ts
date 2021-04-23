import {
  DiagramExperimentItem,
  MetricsEnum,
  SoftKPIsAlgorithmEnum,
  SoftKPIsExperimentEnum,
} from '../../../server/types';
import { isInEnum } from '../util/enumChecker';
//import { DiagramAlgorithmSoftKPIsDataProvider } from './diagramAlgorithmSoftKPIsDataProvider';
import { DiagramExperimentSoftKPIsDataProvider } from './diagramExperimentSoftKPIsDataProvider';
import { DiagramMetricsDataProvider } from './diagramMetricsDataProvider';

export abstract class DiagramDataProvider {
  abstract getData(
    metric: MetricsEnum | SoftKPIsExperimentEnum | SoftKPIsAlgorithmEnum,
    experiment: DiagramExperimentItem
  ): number;
}

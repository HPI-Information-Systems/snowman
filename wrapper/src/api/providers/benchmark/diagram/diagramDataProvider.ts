import {
  DiagramExperimentItem,
  MetricsEnum,
  SoftKPIsAlgorithmEnum,
  SoftKPIsExperimentEnum,
} from '../../../server/types';
import { isInEnum } from '../util/enumChecker';
import { DiagramAlgorithmSoftKPIsDataProvider } from './diagramAlgorithmSoftKPIsDataProvider';
import { DiagramExperimentSoftKPIsDataProvider } from './diagramExperimentSoftKPIsDataProvider';
import { DiagramMetricsDataProvider } from './diagramMetricsDataProvider';

export abstract class DiagramDataProvider {
  abstract getData(
    metric: MetricsEnum | SoftKPIsExperimentEnum | SoftKPIsAlgorithmEnum,
    experiment: DiagramExperimentItem
  ): number;
}

export function getDiagramDataProvider(
  axis: MetricsEnum | SoftKPIsExperimentEnum | SoftKPIsAlgorithmEnum
): DiagramDataProvider {
  if (isInEnum(MetricsEnum, axis)) new DiagramMetricsDataProvider();
  if (isInEnum(SoftKPIsExperimentEnum, axis))
    new DiagramExperimentSoftKPIsDataProvider();
  if (isInEnum(SoftKPIsAlgorithmEnum, axis))
    new DiagramAlgorithmSoftKPIsDataProvider();
  throw new Error(
    'The provided axis-parameter does not belong to any known metric'
  );
}

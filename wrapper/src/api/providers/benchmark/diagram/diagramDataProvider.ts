import {
  DiagramExperimentItem,
  MetricsEnum,
  SoftKPIsExperimentEnum,
} from '../../../server/types';
import { isInEnum } from '../util/enumChecker';
import { DiagramMetricsDataProvider } from './diagramMetricsDataProvider';
import { DiagramSoftKPIsDataProvider } from './diagramSoftKPIsDataProvider';

export abstract class DiagramDataProvider {
  abstract getData(
    metric: MetricsEnum | SoftKPIsExperimentEnum,
    experiment: DiagramExperimentItem
  ): number;
}

export function getDiagramDataProvider(
  axis: MetricsEnum | SoftKPIsExperimentEnum
): DiagramDataProvider {
  if (isInEnum(MetricsEnum, axis)) new DiagramMetricsDataProvider();
  if (isInEnum(SoftKPIsExperimentEnum, axis)) new DiagramSoftKPIsDataProvider();
  throw new Error(
    'The provided axis-parameter does not belong to any known metric'
  );
}

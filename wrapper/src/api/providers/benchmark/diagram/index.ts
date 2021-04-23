import {
  MetricsEnum,
  SoftKPIsAlgorithmEnum,
  SoftKPIsExperimentEnum,
} from '../../../server/types';
import { isInEnum } from '../util/enumChecker';
import { DiagramAlgorithmSoftKPIsDataProvider } from './diagramAlgorithmSoftKPIsDataProvider';
import { DiagramDataProvider } from './diagramDataProvider';
import { DiagramExperimentSoftKPIsDataProvider } from './diagramExperimentSoftKPIsDataProvider';
import { DiagramMetricsDataProvider } from './diagramMetricsDataProvider';

export function getDiagramDataProvider(
  axis: MetricsEnum | SoftKPIsExperimentEnum | SoftKPIsAlgorithmEnum
): DiagramDataProvider {
  if (isInEnum(MetricsEnum, axis)) {
    return new DiagramMetricsDataProvider();
  }
  if (isInEnum(SoftKPIsExperimentEnum, axis)) {
    return new DiagramExperimentSoftKPIsDataProvider();
  }
  if (isInEnum(SoftKPIsAlgorithmEnum, axis)) {
    return new DiagramAlgorithmSoftKPIsDataProvider();
  }
  throw new Error(
    'The provided axis-parameter does not belong to any known metric'
  );
}

export * from './diagramAlgorithmSoftKPIsDataProvider';
export * from './diagramDataProvider';
export * from './diagramExperimentSoftKPIsDataProvider';
export * from './diagramMetricsDataProvider';

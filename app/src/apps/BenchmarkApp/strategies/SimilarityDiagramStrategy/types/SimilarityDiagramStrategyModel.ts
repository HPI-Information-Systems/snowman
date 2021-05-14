import { Experiment } from 'api';
import { DiagramCoordinates } from 'api/models/DiagramCoordinates';
import { DiagramTrack } from 'apps/BenchmarkApp/types/DiagramTrack';
import { AllMetricsEnum } from 'types/AllMetricsEnum';

export interface SimilarityDiagramStrategyModel {
  isValidConfig: boolean;
  diagramTracks: DiagramTrack[];
  coordinates: DiagramCoordinates[][];
  experiments: Experiment[];
  yAxis: AllMetricsEnum;
  xAxis: AllMetricsEnum;
  valueRange: [number, number] | undefined;
  definitionRange: [number, number] | undefined;
}

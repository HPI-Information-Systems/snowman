import { DiagramCoordinates } from 'api/models/DiagramCoordinates';
import { KPIDiagramConfiguration } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/SoftKPIDiagramConfigurator';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { AllMetricsEnum } from 'types/AllMetricsEnum';

export enum KpiInvestigatorColorMode {
  BY_MATCHING_SOLUTION = 'By Matching Solution',
  BY_DATASET = 'By Dataset',
}

export interface DiagramTrack {
  name: string;
  coordinates: DiagramCoordinates[];
}

export interface KpiInvestigatorStrategyModel {
  isValidConfig: boolean;
  configuration: ReturnType<typeof KPIDiagramConfiguration['getValue']>;
  diagramTracks: DiagramTrack[];
  coordinates: Record<string, DiagramCoordinates>;
  valueRange: [number, number] | undefined;
  definitionRange: [number, number] | undefined;
  yAxis: AllMetricsEnum;
  xAxis: AllMetricsEnum;
  colorMode: KpiInvestigatorColorMode;
  resources: BenchmarkAppModel['resources'];
}

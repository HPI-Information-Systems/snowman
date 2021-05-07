import { DiagramExperimentItem, Experiment } from 'api';
import { DiagramCoordinates } from 'api/models/DiagramCoordinates';
import { AllMetricsEnum } from 'types/AllMetricsEnum';

export interface KpiInvestigatorStrategyModel {
  isValidConfig: boolean;
  experimentItems: DiagramExperimentItem[];
  coordinates: DiagramCoordinates[];
  selectedExperiment: Experiment[];
  yAxis: AllMetricsEnum;
  xAxis: AllMetricsEnum;
}

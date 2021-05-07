import { DiagramExperimentItem, Experiment } from 'api';
import { DiagramCoordinates } from 'api/models/DiagramCoordinates';

export interface KpiInvestigatorStrategyModel {
  isValidConfig: boolean;
  experimentItems: DiagramExperimentItem[];
  coordinates: DiagramCoordinates[];
  selectedExperiment: Experiment[];
}

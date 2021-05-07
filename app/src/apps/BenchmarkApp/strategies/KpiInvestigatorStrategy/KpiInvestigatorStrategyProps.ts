import { DiagramCoordinates } from 'api/models/DiagramCoordinates';

export interface KpiInvestigatorStrategyStateProps {
  isValidConfig: boolean;
  coordinates: DiagramCoordinates[];
  datasets: DiagramDataset[];
}

export interface DiagramDataset {
  label: string;
  backgroundColor: string;
  data: {
    x: number;
    y: number;
  }[];
}

export type KpiInvestigatorStrategyProps = KpiInvestigatorStrategyStateProps;

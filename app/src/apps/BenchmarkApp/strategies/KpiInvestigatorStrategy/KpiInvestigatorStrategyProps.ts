import { MetricsEnum } from 'api';
import { DiagramCoordinates } from 'api/models/DiagramCoordinates';
import { DiagramDataset } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/types/DiagramDataset';

export interface KpiInvestigatorStrategyStateProps {
  isValidConfig: boolean;
  coordinates: DiagramCoordinates[];
  datasets: DiagramDataset[];
  xAxis: MetricsEnum;
  yAxis: MetricsEnum;
}

export interface KpiInvestigatorStrategyDispatchProps {
  changeXAxis: (anOption: string) => void;
  changeYAxis: (anOption: string) => void;
}

export type KpiInvestigatorStrategyProps = KpiInvestigatorStrategyStateProps &
  KpiInvestigatorStrategyDispatchProps;

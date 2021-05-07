import { MetricsEnum } from 'api';
import { DiagramCoordinates } from 'api/models/DiagramCoordinates';
import { ScatterChartDatasets } from 'components/simple/ChartComponent/ScatterChart';

export interface KpiInvestigatorStrategyStateProps {
  isValidConfig: boolean;
  coordinates: DiagramCoordinates[];
  datasets: ScatterChartDatasets;
  xAxis: MetricsEnum;
  yAxis: MetricsEnum;
}

export interface KpiInvestigatorStrategyDispatchProps {
  changeXAxis: (anOption: string) => void;
  changeYAxis: (anOption: string) => void;
}

export type KpiInvestigatorStrategyProps = KpiInvestigatorStrategyStateProps &
  KpiInvestigatorStrategyDispatchProps;

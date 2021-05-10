import { ScatterChartDatasets } from 'components/simple/ChartComponent/ScatterChart';
import { AllMetricsEnum } from 'types/AllMetricsEnum';

export interface KpiInvestigatorStrategyStateProps {
  isValidConfig: boolean;
  datasets: ScatterChartDatasets;
  xAxis: AllMetricsEnum;
  yAxis: AllMetricsEnum;
}

export interface KpiInvestigatorStrategyDispatchProps {
  changeXAxis: (anOption: string) => void;
  changeYAxis: (anOption: string) => void;
}

export type KpiInvestigatorStrategyProps = KpiInvestigatorStrategyStateProps &
  KpiInvestigatorStrategyDispatchProps;

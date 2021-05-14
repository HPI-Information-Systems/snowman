import { KpiInvestigatorColorMode } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/types/KpiInvestigatorStrategyModel';
import { ScatterChartDatasets } from 'components/simple/ChartComponent/ScatterChart';
import { AllMetricsEnum } from 'types/AllMetricsEnum';

export interface KpiInvestigatorStrategyStateProps {
  isValidConfig: boolean;
  datasets: ScatterChartDatasets;
  xAxis: AllMetricsEnum;
  yAxis: AllMetricsEnum;
  colorMode: KpiInvestigatorColorMode;
  valueRange: [number, number] | undefined;
  definitionRange: [number, number] | undefined;
}

export interface KpiInvestigatorStrategyDispatchProps {
  changeXAxis: (anOption: string) => void;
  changeYAxis: (anOption: string) => void;
  changeColorMode: (anOption: string) => void;
}

export type KpiInvestigatorStrategyProps = KpiInvestigatorStrategyStateProps &
  KpiInvestigatorStrategyDispatchProps;

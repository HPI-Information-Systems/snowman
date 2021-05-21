import { ScatterChartDatasets } from 'components/simple/ChartComponent/ScatterChart';
import { AllMetricsEnum } from 'types/AllMetricsEnum';

export interface SimilarityDiagramStrategyStateProps {
  isValidConfig: boolean;
  datasets: ScatterChartDatasets;
  yAxis: AllMetricsEnum;
  xAxis: AllMetricsEnum;
  valueRange: [number, number] | undefined;
  definitionRange: [number, number] | undefined;
}

export interface SimilarityDiagramStrategyDispatchProps {
  changeYAxis: (anOption: string) => void;
  changeXAxis: (anOption: string) => void;
}

export type SimilarityDiagramStrategyProps = SimilarityDiagramStrategyStateProps &
  SimilarityDiagramStrategyDispatchProps;

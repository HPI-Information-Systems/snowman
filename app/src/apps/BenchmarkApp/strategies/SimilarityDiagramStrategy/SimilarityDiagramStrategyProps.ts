import { ScatterChartDatasets } from 'components/simple/ChartComponent/ScatterChart';
import { AllMetricsEnum } from 'types/AllMetricsEnum';

export interface SimilarityDiagramStrategyStateProps {
  isValidConfig: boolean;
  datasets: ScatterChartDatasets;
  yAxis: AllMetricsEnum;
}

export interface SimilarityDiagramStrategyDispatchProps {
  changeYAxis: (anOption: string) => void;
}

export type SimilarityDiagramStrategyProps = SimilarityDiagramStrategyStateProps &
  SimilarityDiagramStrategyDispatchProps;

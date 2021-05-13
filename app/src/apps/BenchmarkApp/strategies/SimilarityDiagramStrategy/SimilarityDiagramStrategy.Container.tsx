import { getMyColor } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/utils/colorGenerator';
import SimilarityDiagramStrategyView from 'apps/BenchmarkApp/strategies/SimilarityDiagramStrategy/SimilarityDiagramStrategy.View';
import {
  SimilarityDiagramStrategyDispatchProps,
  SimilarityDiagramStrategyStateProps,
} from 'apps/BenchmarkApp/strategies/SimilarityDiagramStrategy/SimilarityDiagramStrategyProps';
import {
  loadCoordinates,
  setXAxis,
  setYAxis,
} from 'apps/BenchmarkApp/strategies/SimilarityDiagramStrategy/store/SimilarityDiagramStrategyActions';
import { SimilarityDiagramStrategyModel } from 'apps/BenchmarkApp/strategies/SimilarityDiagramStrategy/types/SimilarityDiagramStrategyModel';
import { ScatterChartDataset } from 'components/simple/ChartComponent/ScatterChart';
import { connect } from 'react-redux';
import { AllMetricsEnum } from 'types/AllMetricsEnum';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: SimilarityDiagramStrategyModel
): SimilarityDiagramStrategyStateProps => ({
  isValidConfig: state.isValidConfig,
  yAxis: state.yAxis,
  xAxis: state.xAxis,
  datasets: state.coordinates.map(
    (myCoordinates, index): ScatterChartDataset => ({
      label: state.diagramTracks[index]?.name ?? index.toString(),
      backgroundColor: getMyColor(index, 0.7),
      borderColor: getMyColor(index),
      data: myCoordinates,
      pointRadius: 3,
      pointHoverRadius: 5,
      borderWidth: 1,
    })
  ),
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<SimilarityDiagramStrategyModel>
): SimilarityDiagramStrategyDispatchProps => ({
  changeYAxis: (anOption: string): void => {
    dispatch(setYAxis(anOption as AllMetricsEnum));
    dispatch(loadCoordinates()).then();
  },
  changeXAxis: (anOption: string): void => {
    dispatch(setXAxis(anOption as AllMetricsEnum));
    dispatch(loadCoordinates()).then();
  },
});

const SimilarityDiagramStrategyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SimilarityDiagramStrategyView);

export default SimilarityDiagramStrategyContainer;

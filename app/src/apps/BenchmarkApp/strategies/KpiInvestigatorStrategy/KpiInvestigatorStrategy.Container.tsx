import KpiInvestigatorStrategyView from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/KpiInvestigatorStrategy.View';
import {
  KpiInvestigatorStrategyDispatchProps,
  KpiInvestigatorStrategyStateProps,
} from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/KpiInvestigatorStrategyProps';
import {
  loadCoordinates,
  setColorMode,
  setXAxis,
  setYAxis,
} from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/store/KpiInvestigatorStrategyActions';
import {
  KpiInvestigatorColorMode,
  KpiInvestigatorStrategyModel,
} from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/types/KpiInvestigatorStrategyModel';
import { getMyColor } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/utils/colorGenerator';
import { ScatterChartDataset } from 'components/simple/ChartComponent/ScatterChart';
import { sortBy } from 'lodash';
import { connect } from 'react-redux';
import { AllMetricsEnum } from 'types/AllMetricsEnum';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: KpiInvestigatorStrategyModel
): KpiInvestigatorStrategyStateProps => ({
  isValidConfig: state.isValidConfig,
  datasets: state.diagramTracks.map(
    (diagramTrack, index): ScatterChartDataset => ({
      label: diagramTrack.name,
      backgroundColor: getMyColor(index, 0.7),
      borderColor: getMyColor(index),
      data: sortBy(diagramTrack.coordinates.slice(), ({ x }) => x),
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 1,
      showLine: true,
    })
  ),
  xAxis: state.xAxis,
  yAxis: state.yAxis,
  colorMode: state.colorMode,
  definitionRange: state.definitionRange,
  valueRange: state.valueRange,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<KpiInvestigatorStrategyModel>
): KpiInvestigatorStrategyDispatchProps => ({
  changeXAxis: (anOption: string): void => {
    dispatch(setXAxis(anOption as AllMetricsEnum));
    dispatch(loadCoordinates());
  },
  changeYAxis: (anOption: string): void => {
    dispatch(setYAxis(anOption as AllMetricsEnum));
    dispatch(loadCoordinates());
  },
  changeColorMode: (anOption: string): void => {
    dispatch(setColorMode(anOption as KpiInvestigatorColorMode));
    dispatch(loadCoordinates());
  },
});

const KpiInvestigatorStrategyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(KpiInvestigatorStrategyView);

export default KpiInvestigatorStrategyContainer;

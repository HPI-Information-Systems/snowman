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
import { AllMetricsEnum, AllMetricsObject } from 'types/AllMetricsEnum';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: KpiInvestigatorStrategyModel
): KpiInvestigatorStrategyStateProps => ({
  isValidConfig: state.isValidConfig,
  datasets: [
    {
      name: 'Alpha',
      data: [
        { x: 0, y: 0.3 },
        { x: 1, y: 0.4 },
        { x: 2.5, y: 0.5 },
        { x: 4, y: 0.55 },
        { x: 6, y: 0.65 },
        { x: 8, y: 0.7 },
        { x: 11, y: 0.75 },
        { x: 13, y: 0.8 },
        { x: 15, y: 0.85 },
        { x: 16, y: 0.88 },
        { x: 24, y: 0.9 },
        { x: 30, y: 0.9 },
        { x: 35, y: 0.91 },
      ],
    },
    {
      name: 'Beta',
      data: [
        { x: 0, y: 0 },
        { x: 1, y: 0.15 },
        { x: 2.5, y: 0.3 },
        { x: 4, y: 0.4 },
        { x: 6, y: 0.49 },
        { x: 8, y: 0.5 },
        { x: 11, y: 0.7 },
        { x: 14, y: 0.75 },
        { x: 17, y: 0.85 },
        { x: 22, y: 0.91 },
        { x: 28, y: 0.95 },
        { x: 40, y: 0.98 },
      ],
    },
  ].map(
    (diagramTrack, index): ScatterChartDataset => ({
      label: diagramTrack.name,
      backgroundColor: getMyColor(index, 0.7),
      borderColor: getMyColor(index),
      data: sortBy(diagramTrack.data.slice(), ({ x }) => x),
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 1,
      showLine: true,
    })
  ),
  xAxis: AllMetricsObject.MultiplyEffort,
  yAxis: AllMetricsObject.F1Score,
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

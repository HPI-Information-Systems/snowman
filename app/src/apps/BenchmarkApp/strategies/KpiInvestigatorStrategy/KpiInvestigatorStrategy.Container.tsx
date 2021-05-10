import { Experiment } from 'api';
import { DiagramCoordinates } from 'api/models/DiagramCoordinates';
import KpiInvestigatorStrategyView from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/KpiInvestigatorStrategy.View';
import {
  KpiInvestigatorStrategyDispatchProps,
  KpiInvestigatorStrategyStateProps,
} from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/KpiInvestigatorStrategyProps';
import {
  loadCoordinates,
  setXAxis,
  setYAxis,
} from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/store/KpiInvestigatorStrategyActions';
import { KpiInvestigatorStrategyModel } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/types/KpiInvestigatorStrategyModel';
import { getMyColor } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/utils/colorGenerator';
import { ScatterChartDataset } from 'components/simple/ChartComponent/ScatterChart';
import { groupBy } from 'lodash';
import { connect } from 'react-redux';
import { AllMetricsEnum } from 'types/AllMetricsEnum';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: KpiInvestigatorStrategyModel
): KpiInvestigatorStrategyStateProps => ({
  isValidConfig: state.isValidConfig,
  coordinates: state.coordinates,
  datasets: Object.values(
    groupBy(
      state.coordinates,
      (aCoordinate: DiagramCoordinates) => aCoordinate.experimentId ?? 0
    )
  ).map(
    (anItemArray, index): ScatterChartDataset => ({
      label:
        state.experiments.find(
          (anExperiment: Experiment): boolean =>
            anExperiment.id === anItemArray[0].experimentId
        )?.name ?? anItemArray[0].experimentId?.toString(),
      backgroundColor: getMyColor(index),
      data: anItemArray,
      pointRadius: 6,
      pointHoverRadius: 10,
    })
  ),
  xAxis: state.xAxis,
  yAxis: state.yAxis,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<KpiInvestigatorStrategyModel>
): KpiInvestigatorStrategyDispatchProps => ({
  changeXAxis: (anOption: string): void => {
    dispatch(setXAxis(anOption as AllMetricsEnum));
    dispatch(loadCoordinates()).then();
  },
  changeYAxis: (anOption: string): void => {
    dispatch(setYAxis(anOption as AllMetricsEnum));
    dispatch(loadCoordinates()).then();
  },
});

const KpiInvestigatorStrategyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(KpiInvestigatorStrategyView);

export default KpiInvestigatorStrategyContainer;

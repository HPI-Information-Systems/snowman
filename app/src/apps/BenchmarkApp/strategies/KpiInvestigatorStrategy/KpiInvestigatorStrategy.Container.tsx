import { Experiment, MetricsEnum } from 'api';
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
import { DiagramDataset } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/types/DiagramDataset';
import { KpiInvestigatorStrategyModel } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/types/KpiInvestigatorStrategyModel';
import { getNextColor } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/utils/colorGenerator';
import { groupBy, map } from 'lodash';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: KpiInvestigatorStrategyModel
): KpiInvestigatorStrategyStateProps => ({
  isValidConfig: state.isValidConfig,
  coordinates: state.coordinates,
  datasets: map(
    groupBy(
      state.coordinates,
      (aCoordinate: DiagramCoordinates) => aCoordinate.experimentId ?? 0
    ),
    (anArray, aKey): DiagramDataset => ({
      label:
        state.selectedExperiment.find(
          (anExperiment: Experiment): boolean =>
            anExperiment.id.toString() === aKey
        )?.name ?? aKey,
      backgroundColor: getNextColor(),
      data: anArray,
    })
  ),
  xAxis: state.xAxis,
  yAxis: state.yAxis,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<KpiInvestigatorStrategyModel>
): KpiInvestigatorStrategyDispatchProps => ({
  changeXAxis: (anOption: string): void => {
    dispatch(setXAxis(anOption as MetricsEnum));
    dispatch(loadCoordinates()).then();
  },
  changeYAxis: (anOption: string): void => {
    dispatch(setYAxis(anOption as MetricsEnum));
    dispatch(loadCoordinates()).then();
  },
});

const KpiInvestigatorStrategyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(KpiInvestigatorStrategyView);

export default KpiInvestigatorStrategyContainer;

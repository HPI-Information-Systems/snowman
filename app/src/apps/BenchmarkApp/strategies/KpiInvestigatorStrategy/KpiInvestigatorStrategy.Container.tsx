import { Experiment } from 'api';
import { DiagramCoordinates } from 'api/models/DiagramCoordinates';
import KpiInvestigatorStrategyView from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/KpiInvestigatorStrategy.View';
import {
  DiagramDataset,
  KpiInvestigatorStrategyStateProps,
} from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/KpiInvestigatorStrategyProps';
import { KpiInvestigatorStrategyModel } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/types/KpiInvestigatorStrategyModel';
import { getNextColor } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/utils/colorGenerator';
import { groupBy, map } from 'lodash';
import { connect } from 'react-redux';

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
});

const KpiInvestigatorStrategyContainer = connect(mapStateToProps)(
  KpiInvestigatorStrategyView
);

export default KpiInvestigatorStrategyContainer;

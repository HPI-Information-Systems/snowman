import { DiagramCoordinates } from 'api/models/DiagramCoordinates';
import KpiInvestigatorStrategyView from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/KpiInvestigatorStrategy.View';
import { KpiInvestigatorStrategyStateProps } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/KpiInvestigatorStrategyProps';
import { KpiInvestigatorStrategyModel } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/types/KpiInvestigatorStrategyModel';
import { groupBy } from 'lodash';
import { connect } from 'react-redux';

const mapStateToProps = (
  state: KpiInvestigatorStrategyModel
): KpiInvestigatorStrategyStateProps => ({
  isValidConfig: state.isValidConfig,
  coordinates: state.coordinates,
  //groupBy(state.coordinates, (aCoordinate: DiagramCoordinates) => aCoordinate.)
  datasets: [
    {
      label: 'test',
      backgroundColor: 'cyan',
      data: [],
    },
  ],
});

const KpiInvestigatorStrategyContainer = connect(mapStateToProps)(
  KpiInvestigatorStrategyView
);

export default KpiInvestigatorStrategyContainer;

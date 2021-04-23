import { Experiment } from 'api';
import NMetricsStrategyView from 'apps/BenchmarkApp/strategies/NMetricsStrategy/NMetricsStrategy.View';
import {
  NMetricsStrategyDispatchProps,
  NMetricsStrategyOwnProps,
  NMetricsStrategyStateProps,
} from 'apps/BenchmarkApp/strategies/NMetricsStrategy/NMetricsStrategyProps';
import { NMetricsStrategyModel } from 'apps/BenchmarkApp/strategies/NMetricsStrategy/types/NMetricsStrategyModel';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: NMetricsStrategyModel,
  ownProps: NMetricsStrategyOwnProps
): NMetricsStrategyStateProps => ({
  metrics: state.metrics,
  experiments: ownProps.availableExperiments.filter(
    (anExperiment: Experiment): boolean =>
      ownProps.targetExperimentIds.includes(anExperiment.id)
  ),
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<NMetricsStrategyModel>
): NMetricsStrategyDispatchProps => ({
  loadMetrics() {
    console.log('load metrics');
  },
  inspectExperiment(anExperiment: Experiment) {
    console.log('inspect experiment', anExperiment);
  },
});

const NMetricsStrategyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NMetricsStrategyView);

export default NMetricsStrategyContainer;

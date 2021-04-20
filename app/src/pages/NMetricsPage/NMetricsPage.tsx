import { Experiment } from 'api';
import NMetricsPageView from 'pages/NMetricsPage/NMetricsPage.View';
import {
  NMetricsPageDispatchProps,
  NMetricsPageStateProps,
} from 'pages/NMetricsPage/NMetricsPageProps';
import { connect } from 'react-redux';
import {
  inspectOneExperiment,
  loadNMetrics,
} from 'store/actions/NMetricsPageActions';
import { SnowmanDispatch } from 'store/messages';
import { ImmediateStore } from 'store/models';

const mapStateToProps = (state: ImmediateStore): NMetricsPageStateProps => ({
  metrics: state.NMetricsStore.metrics,
  experiments: state.BenchmarkConfigurationStore.chosenExperiments,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): NMetricsPageDispatchProps => ({
  loadMetrics() {
    dispatch(loadNMetrics());
  },
  inspectExperiment(anExperiment: Experiment) {
    dispatch(inspectOneExperiment(anExperiment));
  },
});

const NMetricsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(NMetricsPageView);

export default NMetricsPage;

import NMetricsPageView from 'pages/NMetricsPage/NMetricsPage.View';
import {
  NMetricsPageDispatchProps,
  NMetricsPageStateProps,
} from 'pages/NMetricsPage/NMetricsPageProps';
import { connect } from 'react-redux';
import { loadNMetrics } from 'store/actions/NMetricsPageActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';

const mapStateToProps = (state: Store): NMetricsPageStateProps => ({
  metrics: state.NMetricsStore.metrics,
  experiments: state.BenchmarkConfigurationStore.chosenExperiments,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): NMetricsPageDispatchProps => ({
  loadMetrics() {
    dispatch(loadNMetrics());
  },
});

const NMetricsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(NMetricsPageView);

export default NMetricsPage;

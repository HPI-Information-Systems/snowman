import { MAX_VENN_DIAGRAM_DIMENSION } from 'components/simple/VennDiagram/limits';
import DashboardPageView from 'pages/DashboardPage/DashboardPage.View';
import {
  DashboardPageDispatchProps,
  DashboardPageStateProps,
} from 'pages/DashboardPage/DashboardPageProps';
import { connect } from 'react-redux';
import { loadCounts } from 'store/actions/IntersectionStoreActions';
import { navigateTo } from 'store/actions/RenderStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { ImmediateStore } from 'store/models';
import { ViewIDs } from 'types/ViewIDs';
import {
  couldEnterBinaryMetricsPage,
  couldEnterNMetricsPage,
} from 'utils/accessGuards';

const mapStateToProps = (state: ImmediateStore): DashboardPageStateProps => ({
  isVennDiagramRendered:
    state.BenchmarkConfigurationStore.chosenExperiments.length +
      state.BenchmarkConfigurationStore.chosenGoldStandards.length <=
    MAX_VENN_DIAGRAM_DIMENSION,
  isBinaryMetricsDisabled: !couldEnterBinaryMetricsPage(state),
  isNMetricsDisabled: !couldEnterNMetricsPage(state),
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): DashboardPageDispatchProps => {
  return {
    loadCounts() {
      dispatch(loadCounts()).then();
    },
    openIntersectionPage() {
      dispatch(navigateTo(ViewIDs.INTERSECTION));
    },
    openNMetricsPage() {
      dispatch(navigateTo(ViewIDs.N_METRICS));
    },
    openBinaryMetricsPage() {
      dispatch(navigateTo(ViewIDs.BINARY_METRICS));
    },
  };
};

const DashboardPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPageView);

export default DashboardPage;
